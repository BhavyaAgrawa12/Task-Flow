import { body } from "express-validator";
import { TASK_STATUS, TASK_PRIORITY } from "../constants/taskConstants.js";

export const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ max: 100 })
    .withMessage("Task title cannot exceed 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("status")
    .optional()
    .isIn(TASK_STATUS)
    .withMessage("Invalid task status"),

  body("priority")
    .optional()
    .isIn(TASK_PRIORITY)
    .withMessage("Invalid task priority"),

  body("dueDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid due date"),

  body("estimatedEffort")
    .optional()
    .trim()
    .matches(/^\d+\s*(Hour|Hours)$/i)
    .withMessage("Estimated effort must be like '4 Hours'"),

  body("board")
    .notEmpty()
    .withMessage("Board ID is required")
    .isMongoId()
    .withMessage("Invalid Board ID"),
];

export const updateTaskValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Task title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Task title cannot exceed 100 characters"),

  body("description")
  .optional()
  .trim()
  .isLength({ max: 1000 })
  .withMessage("Description cannot exceed 1000 characters"),

  body("status")
    .optional()
    .isIn(TASK_STATUS)
    .withMessage("Invalid task status"),

  body("priority")
    .optional()
    .isIn(TASK_PRIORITY)
    .withMessage("Invalid task priority"),

  body("dueDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid due date"),

  body("estimatedEffort")
    .optional()
    .trim()
    .matches(/^\d+\s*(Hour|Hours)$/i)
    .withMessage("Estimated effort must be like '4 Hours'"),

  body("board")
    .optional()
    .isMongoId()
    .withMessage("Invalid Board ID"),
];

export const updateTaskStatusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(TASK_STATUS)
    .withMessage("Invalid task status"),
];