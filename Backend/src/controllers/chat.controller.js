import mongoose from "mongoose";
import { messageModel } from "../models/message.model.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { chatModel } from "../models/chat.model.js"
import { generateChatTitle, generateResponse } from "../services/ai.service.js";


export const sendMessageController = asyncWrapper(async (req, res) => {
    const { message, chatId } = req.body;

    let activeChatId = null;
    let chat = null;

    // ✅ Step 1: Validate chatId properly
    if (chatId && mongoose.Types.ObjectId.isValid(chatId)) {
        chat = await chatModel.findById(chatId);

        if (chat) {
            activeChatId = chatId; // ✅ use existing chat
        }
    }

    // ❗ If chat not found → create new
    if (!activeChatId) {
        const title = await generateChatTitle(message);

        chat = await chatModel.create({
            user: req.user.id,
            title
        });

        activeChatId = chat._id;
    }

    // Step 2: Save user message
    const userMessagePromise = messageModel.create({
        chat: activeChatId,
        content: message,
        role: "user"
    });

    // Step 3: Fetch previous messages
    const messagesPromise = messageModel
        .find({ chat: activeChatId })
        .sort({ createdAt: 1 })
        .lean();

    const [_, messages] = await Promise.all([
        userMessagePromise,
        messagesPromise
    ]);

    // Step 4: AI response
    const result = await generateResponse([
        ...messages,
        { content: message, role: "user" }
    ]);

    // Step 5: Save AI message
    await messageModel.create({
        chat: activeChatId,
        content: result,
        role: "ai"
    });

    // Step 6: Final fetch
    const [updatedChat, updatedMessages] = await Promise.all([
        chat,
        messageModel
            .find({ chat: activeChatId })
            .sort({ createdAt: 1 })
            .lean()
    ]);

    res.status(201).json({
        success: true,
        message: "Chat fetched !",
        data: {
            chat: updatedChat,
            messages: updatedMessages
        }
    });
});

export const chatController = { sendMessageController };
