import { body } from "express-validator";

export const createBoardValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Board title is required"),
    
    body("description")
        .optional()
        .trim(),
];

export const updateBoardValidator = [
    body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Board title cannot be empty"),

    body("description")
        .optional()
        .trim(),
];
