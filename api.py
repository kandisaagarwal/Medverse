from fastapi import APIRouter, Body, HTTPException
from typing import Dict

from models.report_model import Report, UserInfo
from services import gemini_service, diagnosis_service
from db import get_database

router = APIRouter()
db = get_database()

@router.post("/submit_report")
async def submit_report(data: Dict = Body(...)):
    """
    Takes user input, calls Gemini to structure it, predicts a diagnosis,
    and stores the report in the database.
    """
    user_input = data.get("symptoms")
    user_email = data.get("email")
    if not user_input or not user_email:
        raise HTTPException(status_code=400, detail="Symptom description and email are required.")

    gemini_data = await gemini_service.get_structured_report(user_input)
    if not gemini_data:
        raise HTTPException(status_code=500, detail="Failed to process report with AI service.")

    structured_report = gemini_data.get("structured_report", {})
    
    # Predict diagnosis
    diagnosis_result = diagnosis_service.predict_condition(user_input)

    # Create report object
    report = Report(
        user_info=UserInfo(
            age=structured_report.get("age"),
            gender=structured_report.get("gender"),
            location=f"{structured_report.get('city', '')}, {structured_report.get('country', '')}"
        ),
        symptoms=user_input,
        severity=gemini_data.get("severity"),
        diagnosis=diagnosis_result.get("diagnosis"),
        follow_ups=gemini_data.get("follow_ups", []),
        email=user_email
    )

    # Insert into DB
    new_report = await db["reports"].insert_one(report.dict(by_alias=True))
    created_report = await db["reports"].find_one({"_id": new_report.inserted_id})

    return {"message": "Report submitted successfully", "report_id": str(created_report["_id"])}