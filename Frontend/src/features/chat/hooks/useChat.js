import { useDispatch } from "react-redux";
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

export const useChat = () => {
  const dispatch = useDispatch();

  const handleSendMessage = async (input) => {
    try {
      dispatch(setIsChatLoading(true));
      const res = await sendMessage(input);
      console.log(res)
      const { data } = res;
      const { chat } = data;

      dispatch(
        setChats({
          [chat._id]: {
            ...chat,
            messages: data.messages,
          },
        })
      );
      dispatch(setCurrentChatId(chat._id));
    } catch (err) {
      console.log("Error in send Message :");
    } finally {
      dispatch(setIsChatLoading(false));
    }
  };



  const handleFetchChats = async () => {
    const res = await getAllChats();

  }



  return { handleSendMessage };
};
