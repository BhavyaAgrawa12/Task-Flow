import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import validateRequest from "../middleware/validateRequest.js";

import { createBoardValidator, updateBoardValidator } from "../validators/boardValidator.js";
import { objectIdValidator } from "../validators/objectIdValidator.js";

import { createBoard, getBoards, getBoardById, updateBoard, deleteBoard } from "../controllers/boardController.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    createBoardValidator,
    validateRequest,
    createBoard
);

router.get(
    "/",
    authMiddleware,
    getBoards
);

router.get(
    "/:id",
    authMiddleware,
    objectIdValidator,
    validateRequest,
    getBoardById
);

router.put(
    "/:id",
    authMiddleware,
    objectIdValidator,
    updateBoardValidator,
    validateRequest,
    updateBoard
);

router.delete(
    "/:id",
    authMiddleware,
    objectIdValidator,
    validateRequest,
    deleteBoard
);

export default router;