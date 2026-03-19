import api from "@/api/httpClient";

export const sendMessage = (data) => {
    return api.post("/chats/send-message", data)
}

export const getAllChats = () => {
    return api.get("/chats");
}


export const getAllChatMessages = (chatId) => {
    return api.get(`/${chatId}/messages`);
}

export const deleteChat = (chatId) => {
    return api.delete(`/${chatId}`);
}