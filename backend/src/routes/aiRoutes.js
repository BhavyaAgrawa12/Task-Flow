import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

import { aiSuggestionValidator } from "../validators/aiValidator.js";

import { getAISuggestion } from "../controllers/aiController.js";

const router = express.Router();

router.post(
  "/suggest",
  authMiddleware,
  aiSuggestionValidator,
  validateRequest,
  getAISuggestion
);

export default router;