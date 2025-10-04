from fastapi import FastAPI
from routes import reports
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="GlobalDoc API",
    description="API for the AI-Assisted Medical Triage System.",
    version="0.1.0"
)

app.include_router(reports.router, prefix="/api/v1", tags=["Reports"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the GlobalDoc API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)