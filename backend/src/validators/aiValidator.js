import { body } from "express-validator";

export const aiSuggestionValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Task Title is required"),

    body("description")
        .optional()
        .trim(),
];
