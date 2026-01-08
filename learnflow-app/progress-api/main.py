import os
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from agents import Agent, Runner, AsyncOpenAI, OpenAIChatCompletionsModel, RunConfig, ModelProvider
from typing import cast, List, Optional
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable not set.")
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/learnflow")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set.")

app = FastAPI(title="Progress API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
Base = declarative_base()

class Student(Base):
    __tablename__ = "students"
    id = Column(String, primary_key=True)
    name = Column(String)
    email = Column(String)

class Progress(Base):
    __tablename__ = "progress"
    id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(String)
    topic = Column(String)
    score = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

# Create engine and tables
try:
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine)
except Exception as e:
    print(f"Database connection failed: {e}")
    engine = None
    SessionLocal = None

# Pydantic models
class ProgressUpdate(BaseModel):
    student_id: str
    topic: str
    score: float

class ProgressResponse(BaseModel):
    student_id: str
    topic: str
    score: float
    timestamp: str

class TopicResponse(BaseModel):
    topics: List[str]

class InsightsResponse(BaseModel):
    student_id: str
    insights: str

# Progress Insights Agent
insights_agent = Agent(
    name="ProgressInsightsAgent",
    instructions="""You analyze student learning data and provide personalized recommendations.
    Identify struggling areas and suggest next steps.
    Be encouraging and constructive.
    Focus on actionable advice.""",
)

# Python curriculum topics
PYTHON_TOPICS = [
    "Variables and Data Types",
    "Control Flow (if/elif/else)",
    "Loops (for/while)",
    "Lists and Tuples",
    "Dictionaries and Sets",
    "Functions",
    "Object-Oriented Programming",
    "File Handling",
    "Error Handling",
    "Modules and Packages"
]

@app.post("/progress", response_model=ProgressResponse)
async def update_progress(progress: ProgressUpdate):
    """Update student progress."""
    if not SessionLocal:
        raise HTTPException(status_code=500, detail="Database not available")
    
    db = SessionLocal()
    try:
        new_progress = Progress(
            student_id=progress.student_id,
            topic=progress.topic,
            score=progress.score
        )
        db.add(new_progress)
        db.commit()
        db.refresh(new_progress)
        
        return ProgressResponse(
            student_id=new_progress.student_id,
            topic=new_progress.topic,
            score=new_progress.score,
            timestamp=str(new_progress.timestamp)
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@app.get("/progress/{student_id}")
async def get_progress(student_id: str):
    """Get student progress."""
    if not SessionLocal:
        raise HTTPException(status_code=500, detail="Database not available")
    
    db = SessionLocal()
    try:
        progress_records = db.query(Progress).filter(Progress.student_id == student_id).all()
        
        return {
            "student_id": student_id,
            "progress": [
                {
                    "topic": p.topic,
                    "score": p.score,
                    "timestamp": str(p.timestamp)
                }
                for p in progress_records
            ]
        }
    finally:
        db.close()

@app.get("/topics", response_model=TopicResponse)
async def get_topics():
    """List all Python curriculum topics."""
    return TopicResponse(topics=PYTHON_TOPICS)

@app.get("/insights/{student_id}", response_model=InsightsResponse)
async def get_insights(student_id: str):
    """Get AI-generated learning insights."""
    if not SessionLocal:
        raise HTTPException(status_code=500, detail="Database not available")
    
    db = SessionLocal()
    try:
        progress_records = db.query(Progress).filter(Progress.student_id == student_id).all()
        
        if not progress_records:
            return InsightsResponse(
                student_id=student_id,
                insights="No progress data available yet. Start learning to get personalized insights!"
            )
        
        # Prepare progress summary
        progress_summary = "\n".join([
            f"- {p.topic}: {p.score}%"
            for p in progress_records
        ])
        
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
        
        prompt = f"Analyze this student's Python learning progress and provide personalized insights:\n\n{progress_summary}"
        response = await Runner.run(insights_agent, input=prompt, run_config=config)
        
        return InsightsResponse(
            student_id=student_id,
            insights=response.final_output
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Insights generation failed: {str(e)}")
    finally:
        db.close()

@app.get("/health")
async def health():
    db_status = "connected" if SessionLocal else "disconnected"
    return {
        "status": "healthy",
        "service": "progress-api",
        "database": db_status
    }

@app.get("/")
async def root():
    return {"message": "Welcome to Progress API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)