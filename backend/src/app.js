import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import boardRoutes from "./routes/boardRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"


const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/ai",aiRoutes);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message : "TaskFlow API is running successfully",
    });
});

app.use("/api/boards",boardRoutes);

export default app;