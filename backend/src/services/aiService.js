import { GoogleGenerativeAI } from "@google/generative-ai";

const createGeminiModel = () => {
  const geminiApiKey = process.env.GEMINI_API_KEY?.trim();

  if (!geminiApiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment variables");
  }

  const genAI = new GoogleGenerativeAI(geminiApiKey);

  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });
};

export const getAISuggestionService = async (title, description) => {
  try {
    const model = createGeminiModel();

    const today = new Date().toISOString().split("T")[0];

    const prompt = `
You are an AI software project estimation assistant.

Today's date is ${today}.

Analyze the following software development task.

Return ONLY valid JSON in this exact format:

{
  "estimatedEffort": "4 Hours",
  "suggestedDueDate": "YYYY-MM-DD",
  "reason": "One short sentence."
}

Rules:
- Return ONLY JSON.
- Do NOT wrap the JSON inside markdown.
- Do NOT add any explanation outside the JSON.
- suggestedDueDate must be TODAY or a FUTURE date.
- estimatedEffort MUST use hours only, e.g. "4 Hours", "80 Hours" — never use days or weeks.
- Keep the reason short and professional.

Task Title:
${title}

Task Description:
${description}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response.text();

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const aiResponse = JSON.parse(cleaned);

    if (
      !aiResponse.estimatedEffort ||
      !aiResponse.suggestedDueDate ||
      !aiResponse.reason
    ) {
      throw new Error("Invalid AI response");
    }

    return aiResponse;

  } catch (error) {
    console.error("Gemini Error:", error.message);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      estimatedEffort: "4 Hours",
      suggestedDueDate: tomorrow.toISOString().split("T")[0],
      reason: "AI unavailable. Default estimate generated.",
    };
  }
};