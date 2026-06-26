import { param } from "express-validator";

export const objectIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid ID"),
];
