# 🚑 GlobalDoc: AI-Assisted Medical Triage System

You are helping build a **hackathon project** that connects users with med students for anonymous medical triage.
The goal is SPEED, clarity, and working prototypes over complexity.

---

## 🧭 PROJECT OVERVIEW

**Purpose:**
Allow users worldwide to describe medical issues through a chat interface.  
Gemini structures the data, Hugging Face predicts possible diagnoses,  
and med students (with supervisor oversight) review and finalize the report.

**System Flow:**
1. User (React Native app) enters:
   - Age, gender, city, country, phone (no name or login)
   - Description of symptoms + optional image
2. Backend (FastAPI):
   - Sends input to Gemini API → gets structured report + severity score
   - Stores report in MongoDB Atlas
   - Passes summary to Hugging Face model for likely diagnosis
   - Assigns report to a nearby med student (volunteer) with least queue
3. Volunteer (React web dashboard) can:
   - ✅ Accept → Send structured report to user
   - 💬 Ask follow-ups → Gemini continues chat with context
   - 💊 Prescribe OTC → Sends supervisor approval email
   - 🚨 Out of Scope → Notifies user to seek local care
4. Supervisor receives email → approves OTC → user gets final report via email.

---

## ⚙️ TECH STACK

| Component | Tech |
|------------|------|
| Frontend (User) | React Native (Expo) |
| Frontend (Volunteer) | React.js + Tailwind |
| Backend | FastAPI (Python) |
| Database | MongoDB Atlas |
| AI APIs | Gemini (Google Generative AI) + Hugging Face Transformers |
| Email | SendGrid or Nodemailer |
| Hosting | Render / Vercel / Expo |

---

## 📁 PROJECT STRUCTURE

root/
├── backend/
│ ├── main.py # FastAPI app
│ ├── routes/ # submit_report, assign_volunteer, review_action
│ ├── services/
│ │ ├── gemini_service.py
│ │ ├── diagnosis_service.py
│ │ ├── email_service.py
│ ├── models/
│ │ ├── report_model.py
│ │ ├── volunteer_model.py
│ │ ├── supervisor_model.py
│ └── db.py
│
├── mobile-app/
│ ├── App.js # React Native chat UI
│ └── components/ # Chat UI, file upload, etc.
│
├── volunteer-dashboard/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── pages/Review.jsx
│ │ └── components/
│
└── PROJECT_PROMPT.md


---

## 🧩 REQUIRED BACKEND ENDPOINTS

Copilot should create the following:

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/submit_report` | POST | Takes user input → calls Gemini → stores structured report |
| `/assign_volunteer` | POST | Finds nearest, least-busy med student |
| `/review_action` | POST | Handles volunteer actions: accept, ask, prescribe, out_of_scope |
| `/send_supervisor_approval` | POST | Sends email with OTC recommendation |
| `/approve_prescription/:token` | GET | Supervisor approval callback |
| `/get_report/:id` | GET | Sends final report to user |

Each `report` object in MongoDB should look like:
```json
{
  "_id": "abc123",
  "user_info": { "age": 23, "gender": "F", "location": "Mumbai, IN" },
  "symptoms": "Headache and fever for two days",
  "severity": 2,
  "diagnosis": "Viral fever",
  "status": "pending_review",
  "assigned_to": "volunteer_id",
  "follow_ups": [],
  "email": "user@example.com"
}

🧠 AI INTEGRATIONS
Gemini (Google Generative AI)

Prompt template Copilot should use in gemini_service.py:

prompt = f"""
You are a virtual medical assistant.
User description:
{user_input}

Extract:
- Age, gender, city, country
- Duration of symptoms
- Symptom list
- Severity score (1-5)
- Follow-up questions (if missing data)

Respond only in valid JSON:
{{
  "structured_report": {{
     "age": ..., "gender": ..., "symptoms": [...],
     "duration": ..., "notes": ...
  }},
  "severity": <int>,
  "follow_ups": [...]
}}
"""

Hugging Face Diagnosis Model

Use a lightweight model (e.g. d4data/biobert-medical-condition-classification).

Copilot should create diagnosis_service.py with:

from transformers import pipeline
diagnose = pipeline("text-classification", model="d4data/biobert-medical-condition-classification")

def predict_condition(symptoms: str):
    result = diagnose(symptoms)[0]
    return {"diagnosis": result["label"], "confidence": result["score"]}

📧 EMAIL FLOW

In email_service.py, Copilot should implement:

SendGrid or Nodemailer integration

Two types of emails:

Supervisor approval link with token

Final report to user

🧭 DEVELOPMENT TASK ORDER

Setup backend (FastAPI + MongoDB)

Implement /submit_report → Gemini integration

Add Hugging Face model → enrich report

Implement routing logic /assign_volunteer

Build volunteer dashboard (React) → list + review actions

Implement supervisor email + approval flow

Connect React Native chat UI to /submit_report

Test full loop with mock data

✅ GOALS FOR HACKATHON DEMO

Show LLM transforming user message → structured medical report.

Show med student reviewing report and approving it.

Show final email reaching user.

Keep system secure, anonymous, and fast.

💡 Notes for Copilot/Cursor

Prioritize working endpoints over perfect structure.

Suggest boilerplate FastAPI routes with clear JSON schema.

Auto-generate models and DB functions when missing.

For frontend, scaffold minimal UI first (chat + review list).
