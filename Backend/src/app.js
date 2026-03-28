import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

import authRouter from "./routes/auth.Routes.js";
import chatRouter from "./routes/chat.Routes.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const publicPath = path.join(__dirname, "..", "public");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// app.use(express.static(publicPath));

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

// app.use(express.static(path.join(__dirname, "../public")));
// 
// // SPA fallback
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });
app.use(errorHandler);

export default app;