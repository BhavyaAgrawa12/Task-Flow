import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import boardRoutes from "./routes/boardRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"

const app = express();

const allowedOrigins =
  process.env.CLIENT_URL?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!allowedOrigins.length) {
                callback(null, true);
                return;
            }

            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TaskFlow API is running successfully",
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true, status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

export default app;
