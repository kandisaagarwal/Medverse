const express = require('express');
const { callGemini } = require("./callGemini.js");
const router = express.Router();

const structuredReportTemplate = {
  age: null,
  gender: null,
  duration: null,
  rawInput: null,
  symptoms: [],
  severity: null,
  diagnosis: null,
  recommendedActions: [],
  images: [] // optional
};


const SESSION_KEY = "demo-session"; // fixed session for MVP

const sessions = {};

const REQUIRED_FIELDS = ["age", "gender", "location", "description"];

router.post("/chat", async (req, res) => {
  const { message, prefilledDemographics } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // initialize session with system message if first time
  if (!sessions[SESSION_KEY]) {
    // Create system message with optional prefilled demographics
    let systemMessage  = `You are a professional medical assistant. 
    The user has already provided the following demographic information: ${JSON.stringify(prefilledDemographics)}
    Only ask for missing required information (description of symptoms, duration of symptoms) and optional pictures and anything else you think makes sense. 
    Do NOT ask about demographics already provided.
    Do NOT provide any diagnosis yet. Once all required info is collected, respond with: "Thank you for your information, I will have a diagnosis for you."`;

    sessions[SESSION_KEY] = [
      { role: "system", content: systemMessage }
    ];
  }

  // save user message
  sessions[SESSION_KEY].push({ role: "user", content: message });

  // Call Gemini with full session
  let geminiResponse = await callGemini(sessions[SESSION_KEY]);

  // Check for missing required fields (excluding optional images)
  const missingFields = REQUIRED_FIELDS.filter(field =>
    field !== "images" && !sessions[SESSION_KEY].some(msg => msg.content.toLowerCase().includes(field))
  );

  if (missingFields.length > 0) {
    geminiResponse += `\nPlease provide the following missing information: ${missingFields.join(", ")}`;
  }

  // save assistant response
  sessions[SESSION_KEY].push({ role: "assistant", content: geminiResponse });

  res.json({ reply: geminiResponse });
});



function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (match) return JSON.parse(match[0]);
  throw new Error("No JSON found");
}

router.post("/chat/end", async (req, res) => {
  const conversation = sessions[SESSION_KEY];
  const { prefilledDemographics } = req.body;

  if (!conversation) return res.status(400).json({ error: "No active session" });

  // Initialize report with template
  let report = { ...structuredReportTemplate };

  // Collect raw user input
  report.rawInput = conversation
    .filter(msg => msg.role === "user")
    .map(msg => msg.content)
    .join("\n");

  // Prefill demographics if provided
  report.age = prefilledDemographics?.age || null;
  report.gender = prefilledDemographics?.gender || null;

  // Build prompt to extract structured JSON
  const summaryPrompt = [
    {
      role: "system",
      content: `
You are a medical data extraction assistant. 
Extract the following structured information from the conversation below.
Return ONLY valid JSON following this template exactly:

{
  "age": ...,
  "gender": ...,
  "duration": ...,
  "rawInput": ...,
  "symptoms": [...],
  "severity": ...,
  "diagnosis": ...,
  "recommendedActions": [...],
  "images": [...]
}

Do NOT add extra fields. Do NOT provide any advice outside this JSON.
`
    },
    ...conversation
  ];

  try {
    const summaryFromGemini = await callGemini(summaryPrompt);

    // Parse JSON safely
    try {
      const geminiReport = extractJSON(summaryFromGemini);
      report = { ...report, ...geminiReport };
  } catch (err) {
      console.error("Failed to parse Gemini JSON:", err);
      console.log("Raw Gemini output:", summaryFromGemini);
      return res.status(500).json({ error: "Failed to parse structured data" });
      }
  } catch (err) {
    console.error("Failed to parse Gemini JSON:", err);
    return res.status(500).json({ error: "Failed to parse structured data" });
  }

  // Optionally clear session
  delete sessions[SESSION_KEY];

  // Return structured report for DB storage
  res.json({ structuredReport: report });
});

module.exports = router;

