import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  deleteChat,
  getAllChatMessages,
  getAllChats,
} from "../services/chat.api";
import {
  setMessages,
  setCurrentChatId,
  setChats,
  setError,
  setIsChatLoading,
} from "../chat.slice";
import toast from "react-hot-toast";

export const useChat = () => {
  const dispatch = useDispatch();
  const { currentChatId, messages, chats, currentModel } = useSelector((state) => state.chats);

  const handleSendMessage = useCallback(async (messageInput) => {
    try {
      if (!messageInput.trim()) return;

      dispatch(setIsChatLoading(true));

      // Add user message optimistically
      const userMessage = {
        role: "user",
        content: messageInput,
      };
      dispatch(setMessages([...messages, userMessage]));

      // Prepare request payload
      const payload = {
        chatId: currentChatId,
        message: messageInput,
        model: currentModel
      };

      // Send message to server
      const res = await sendMessage(payload);
      console.log("Message response:", res); // DEBUG
      const { chat, messages: allMessages } = res.data;

      // If this was a new chat, update currentChatId and chats
      if (!currentChatId) {
        dispatch(setCurrentChatId(chat._id));

        // Update chats sidebar with the new chat (append to existing)
        const updatedChats = {
          ...(chats || {}),
          [chat._id]: {
            ...chat,
          },
        };
        dispatch(setChats(updatedChats));
      }

      // Update messages with the complete response from server
      dispatch(setMessages(allMessages));

      toast.success("Message sent successfully");
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error(err?.response?.data?.message || "Failed to send message");
      // Remove the optimistically added user message on error
      dispatch(setMessages(messages));
    } finally {
      dispatch(setIsChatLoading(false));
    }
  }, [currentChatId, messages, chats, dispatch]);



  const handleFetchChats = useCallback(async () => {
    try {
      dispatch(setIsChatLoading(true));

      const res = await getAllChats();

      console.log(res.chats); // ✅ correct

      // 🔹 convert array → object map
      const formattedChats = {};

      res.chats.forEach((chat) => {
        formattedChats[chat._id] = {
          ...chat,
          messages: [] // messages will be loaded later
        };
      });

      // ✅ dispatch properly
      dispatch(setChats(formattedChats));

    } catch (error) {
      console.log(error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setIsChatLoading(false));
    }
  }, [dispatch]);


  const fetchAllMessagesOfChatHandler = useCallback(async (chatId) => {
    try {
      dispatch(setError(null));
      dispatch(setIsChatLoading(true));
      const res = await getAllChatMessages(chatId);
      dispatch(setMessages(res.allMessages));
    } catch (err) {
      console.error(err);
      dispatch(setError(err?.message || "Failed to fetch messages"));
    } finally {
      dispatch(setIsChatLoading(false));
    }
  }, [dispatch])



  return { handleFetchChats, fetchAllMessagesOfChatHandler, handleSendMessage };
};
