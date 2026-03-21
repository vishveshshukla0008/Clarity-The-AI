import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import authRouter from "./routes/auth.Routes.js";
import chatRouter from "./routes/chat.Routes.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import morgan from "morgan";


const app = express();

app.use(cors({
    origin: true, // Allow requests from any origin for development
    credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

// Serve static files from the public directory
app.use(express.static('public'));

// Catch-all handler: send back index.html for any non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.use(errorHandler);

export default app;