// backend/src/routes/callDiagnosisAPI.js
import { Client } from "@gradio/client";

let client;

// Initialize client once
async function getClient() {
  if (!client) {
    client = await Client.connect("segadeds/Medical_Diagnosis");
  }
  return client;
}

/**
 * Call the Medical Diagnosis space
 * Expects a report object with a `rawInput` field (or whatever you want to send)
 * Returns ONLY the diagnosis string
 */
export async function callDiagnosisAPI(report) {
  try {
    const client = await getClient();
    
    // Hugging Face space expects input key matching what the Space uses
    // Here the example uses "txt" for the text input
    const result = await client.predict("/predict", { txt: report.rawInput });

    // result.data usually contains an array
    // extract diagnosis from the returned array
    const diagnosis = result?.data?.[0];
    return diagnosis;
  } catch (err) {
    console.error("Error calling diagnosis API:", err);
    return null;
  }
}
