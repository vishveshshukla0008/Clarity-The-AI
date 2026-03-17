import { Router } from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import { sendMessageValidation } from "../validations/chat.validators.js";
import { chatController } from "../controllers/chat.controller.js";

const chatRouter = Router();



chatRouter.post("/send-message", identifyUser, sendMessageValidation, chatController.sendMessageController);


export default chatRouter;