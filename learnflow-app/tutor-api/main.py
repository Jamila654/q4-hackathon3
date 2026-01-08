import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from agents import Agent, Runner, function_tool, AsyncOpenAI, OpenAIChatCompletionsModel, RunConfig, ModelProvider
from typing import cast

# Load environment variables
load_dotenv()

# Set up Gemini credentials
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set.")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable not set.")

# FastAPI app
app = FastAPI(title="Tutor API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ChatRequest(BaseModel):
    student_id: str
    message: str

class ChatResponse(BaseModel):
    student_id: str
    reply: str
    metadata: dict

# Tool function
@function_tool
def get_python_example(topic: str) -> str:
    """Returns a simple Python code example for a given topic."""
    examples = {
        "variables": "name = 'Alice'\nage = 30\nprint(f'Name: {name}, Age: {age}')",
        "lists": "fruits = ['apple', 'banana', 'cherry']\nfor fruit in fruits:\n    print(fruit)",
        "dictionaries": "person = {'name': 'Bob', 'age': 25}\nprint(person['name'])",
        "functions": "def greet(name):\n    return f'Hello, {name}!'\nprint(greet('World'))",
        "loops": "for i in range(5):\n    print(i)",
        "if-else": "x = 10\nif x > 5:\n    print('x is greater than 5')\nelse:\n    print('x is 5 or less')",
        "classes": "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f'{self.name} says woof!'\n\ndog = Dog('Max')\nprint(dog.bark())",
    }
    return examples.get(topic.lower(), "Sorry, I don't have an example for that topic.")

# Python Tutor Agent
tutor_agent = Agent(
    name="PythonTutorAgent",
    instructions="""You are a friendly Python programming tutor for beginners.
    Explain concepts clearly with examples.
    Break down complex topics into simple steps.
    Encourage students and provide helpful hints without giving away full solutions immediately.
    When appropriate, use the get_python_example tool to show code examples.""",
    tools=[get_python_example],
)

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Handles a chat interaction with the Python Tutor Agent."""
    try:
        external_client = AsyncOpenAI(
           api_key=os.getenv("OPENAI_API_KEY"),
           base_url="https://openrouter.ai/api/v1",
        )

        model = OpenAIChatCompletionsModel(
            model="mistralai/devstral-2512:free",
            openai_client=external_client
        )

        config = RunConfig(
            model=model,
            model_provider=cast(ModelProvider, external_client),
            tracing_disabled=True
        )
        
        response = await Runner.run(tutor_agent, input=request.message, run_config=config)
        
        return ChatResponse(
            student_id=request.student_id,
            reply=response.final_output,
            metadata={"timestamp": "now"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent processing failed: {str(e)}")

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "tutor-api"}

@app.get("/")
async def root():
    return {"message": "Welcome to Tutor API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)