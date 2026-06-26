import express from "express"

import authMiddleware from "../middleware/authMiddleware.js"

import validateRequest from "../middleware/validateRequest.js"

import { createTaskValidator, updateTaskValidator, updateTaskStatusValidator } from "../validators/taskValidator.js"
import { objectIdValidator } from "../validators/objectIdValidator.js"

import { createTask, getTasks, getTaskById, updateTask, deleteTask, updateTaskStatus } from "../controllers/taskController.js"





const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createTaskValidator,
  validateRequest,
  createTask
);

router.get(
  "/",
  authMiddleware,
  getTasks
);

router.get(
  "/:id",
  authMiddleware,
  objectIdValidator,
  validateRequest,
  getTaskById
);

router.put(
  "/:id",
  authMiddleware,
  objectIdValidator,
  updateTaskValidator,
  validateRequest,
  updateTask
);

router.delete(
  "/:id",
  authMiddleware,
  objectIdValidator,
  validateRequest,
  deleteTask
);

router.patch(
  "/:id/status",
  authMiddleware,
  objectIdValidator,
  updateTaskStatusValidator,
  validateRequest,
  updateTaskStatus
);

export default router;