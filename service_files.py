import os
import google.generativeai as genai
import json

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def get_structured_report(user_input: str):
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
    model = genai.GenerativeModel('gemini-pro')
    response = await model.generate_content_async(prompt)
    
    # Basic parsing, might need more robust error handling
    try:
        # The API response might include markdown backticks
        cleaned_response = response.text.strip().replace("```json", "").replace("```", "")
        return json.loads(cleaned_response)
    except (json.JSONDecodeError, AttributeError) as e:
        print(f"Error parsing Gemini response: {e}")
        return None