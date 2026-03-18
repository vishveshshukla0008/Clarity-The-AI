import { Router } from "express";
import { identifyUser } from "../middlewares/auth.middleware.js";
import { paramsChatIdValidation, sendMessageValidation } from "../validations/chat.validators.js";
import { chatController } from "../controllers/chat.controller.js";

const chatRouter = Router();



chatRouter.post("/send-message", identifyUser, sendMessageValidation, chatController.sendMessageController);


// Get all chats creating by user !

chatRouter.get("/", identifyUser, chatController.getAllChatsController);


//Get all messages of a single chat on the basis of /:chatId and user.id

chatRouter.get("/:chatId/messages", identifyUser, paramsChatIdValidation, chatController.getAllChatMessagesController)


// Delete a chat after verification of user  

chatRouter.delete("/:chatId", identifyUser, paramsChatIdValidation, chatController.deleteChatController)



export default chatRouter;