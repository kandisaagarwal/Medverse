const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function callGemini(messages) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });

  const conversation = messages.map(m => `${m.role}: ${m.content}`).join("\n");

  const result = await model.generateContent(conversation);
  const response = await result.response;
  return response.text();
}

module.exports = { callGemini };
