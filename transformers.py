from transformers import pipeline

# This will download the model on first run. Consider pre-loading in a real app.
diagnose = pipeline("text-classification", model="d4data/biobert-medical-condition-classification")

def predict_condition(symptoms: str):
    """
    Predicts a medical condition based on symptoms using a Hugging Face model.
    """
    if not symptoms:
        return {"diagnosis": "N/A", "confidence": 0.0}
        
    result = diagnose(symptoms)[0]
    return {"diagnosis": result["label"], "confidence": result["score"]}