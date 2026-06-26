import express from "express";
import { register,login,getMe} from "../controllers/authController.js";
import { loginValidator, registerValidator } from "../validators/authValidator.js";
import validateRequest from "../middleware/validateRequest.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post(
    "/register", registerValidator,validateRequest,register
);
router.post("/login",loginValidator,validateRequest,login)
router.get("/me",authMiddleware,getMe);

export default router;