import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.Routes.js";
import chatRouter from "./routes/chat.Routes.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import morgan from "morgan";


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter)


app.use(errorHandler);

export default app;