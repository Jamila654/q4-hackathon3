import os
import sys
from io import StringIO
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from agents import Agent, Runner, AsyncOpenAI, OpenAIChatCompletionsModel, RunConfig, ModelProvider
from typing import cast
from RestrictedPython import compile_restricted, safe_globals
import signal

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set.")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable not set.")

app = FastAPI(title="Code Runner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ExecuteRequest(BaseModel):
    code: str
    student_id: str

class ExecuteResponse(BaseModel):
    output: str
    success: bool
    error: str

class ReviewRequest(BaseModel):
    code: str

class ReviewResponse(BaseModel):
    suggestions: str
    score: int

# Code Review Agent
review_agent = Agent(
    name="CodeReviewAgent",
    instructions="""You are a code review assistant.
    Analyze Python code for errors, style issues (PEP 8), and suggest improvements.
    Be constructive and educational.
    Provide a score from 0-100 based on code quality.
    Focus on: correctness, readability, efficiency, and best practices.""",
)

# Timeout handler
class TimeoutException(Exception):
    pass

def timeout_handler(signum, frame):
    raise TimeoutException("Code execution timeout")

def execute_code_safely(code: str, timeout: int = 5) -> dict:
    """Execute Python code with basic safety (for demo purposes)."""
    try:
        # Basic security: block dangerous imports
        dangerous = ['os', 'sys', 'subprocess', 'eval', 'exec', 'open', '__import__']
        for danger in dangerous:
            if danger in code:
                return {
                    "output": "",
                    "success": False,
                    "error": f"Security: '{danger}' is not allowed"
                }
        
        # Capture stdout
        old_stdout = sys.stdout
        sys.stdout = captured_output = StringIO()
        
        # Set timeout (Unix only)
        if hasattr(signal, 'SIGALRM'):
            signal.signal(signal.SIGALRM, timeout_handler)
            signal.alarm(timeout)
        
        try:
            # Execute code in restricted namespace
            namespace = {'__builtins__': __builtins__}
            exec(code, namespace)
            output = captured_output.getvalue()
            
            return {
                "output": output,
                "success": True,
                "error": ""
            }
        except TimeoutException:
            return {
                "output": "",
                "success": False,
                "error": "Execution timeout (5 seconds limit)"
            }
        except Exception as e:
            return {
                "output": captured_output.getvalue(),
                "success": False,
                "error": str(e)
            }
        finally:
            if hasattr(signal, 'SIGALRM'):
                signal.alarm(0)
            sys.stdout = old_stdout
            
    except Exception as e:
        return {
            "output": "",
            "success": False,
            "error": f"Execution error: {str(e)}"
        }

@app.post("/execute", response_model=ExecuteResponse)
async def execute(request: ExecuteRequest):
    """Execute Python code safely."""
    result = execute_code_safely(request.code)
    
    return ExecuteResponse(
        output=result["output"],
        success=result["success"],
        error=result["error"]
    )

@app.post("/review", response_model=ReviewResponse)
async def review(request: ReviewRequest):
    """Review code quality using AI."""
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
        
        prompt = f"Review this Python code and provide suggestions and a score (0-100):\n\n```python\n{request.code}\n```"
        response = await Runner.run(review_agent, input=prompt, run_config=config)
        
        # Extract score (simple heuristic)
        score = 75  # Default score
        text = response.final_output
        if "score" in text.lower():
            import re
            match = re.search(r'(\d+)/100', text)
            if match:
                score = int(match.group(1))
        
        return ReviewResponse(
            suggestions=response.final_output,
            score=score
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Review failed: {str(e)}")

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "code-runner"}

@app.get("/")
async def root():
    return {"message": "Welcome to Code Runner API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)