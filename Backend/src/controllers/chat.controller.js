import mongoose from "mongoose";
import { messageModel } from "../models/message.model.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { chatModel } from "../models/chat.model.js"
import { generateChatTitle, generateResponse } from "../services/ai.service.js";

/***
 * Information
 * @route [GET, POST, DELETE] on /api/chats
 * @description CHAT RELATED BUSINESS LOGIC
 * @access  private
 */



/***
 * @route POST /api/chats/message
 * @description Send a message with chatId and returns updated chat :
 * @access  private
 */


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



/***
 * @route GET /api/chats/
 * @description returns all chats of logged in user 
 * @access  private
 */


export const getAllChatsController = asyncWrapper(async (req, res) => {
    const user = req.user;

    const chats = await chatModel.find({ user: user.id })

    return res.status(200).json({ success: true, message: "Chats Fetched Success !", chats })
})


/***
 * @route get /api/chats/:chatId/messages
 * @description After ownership verification returns all messages created in a single chat to user
 * @access  private
 */


export const getAllChatMessagesController = asyncWrapper(async (req, res) => {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({ _id: chatId, user: req.user.id });

    if (!chat) return res.status(404).json({ success: false, message: "Chat does not exist !" });

    const allMessages = await messageModel.find({ chat: chat._id });

    return res.status(200).json({ success: true, message: "Message Retrieved successfully !", allMessages });
})


/***
 * @route DELETE /api/chats/:chatId
 * @description After ownership verification this will delete a chat and stored messages instantly via mongoose Transaction !
 * @access  private
 */


export const deleteChatController = asyncWrapper(async (req, res) => {
    const { chatId } = req.params;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // 1. Delete chat (with ownership check)
        const chat = await chatModel.findOneAndDelete(
            { _id: chatId, user: req.user.id },
            { session }
        );

        if (!chat) {
            await session.abortTransaction();
            session.endSession();

            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        // 2. Delete all related messages
        await messageModel.deleteMany({ chat: chatId }, { session });

        // 3. Commit transaction
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            message: "Chat deleted successfully",
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error; // handled by asyncWrapper
    }
});



export const chatController = { sendMessageController, getAllChatsController, getAllChatMessagesController, deleteChatController };
