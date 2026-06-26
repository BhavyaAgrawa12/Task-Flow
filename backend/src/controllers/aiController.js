import { getAISuggestionService } from "../services/aiService.js";

export const getAISuggestion = async (req, res) => {
  try {
    const { title, description } = req.body;

    const suggestion = await getAISuggestionService(
      title,
      description
    );

    return res.status(200).json({
      success: true,
      message: "AI suggestion generated successfully",
      data: suggestion,
    });

  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [],
    });
  }
};