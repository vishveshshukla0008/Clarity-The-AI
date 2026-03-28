import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat slice",
    initialState: {
        chats: [],
        currentChatId: null,
        messages: [],
        isChatLoading: false,
        error: null,
        currentModel: "gemini",
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setIsChatLoading: (state, action) => {
            state.isChatLoading = action.payload
        },
        setCurrentModel: (state, action) => {
            state.currentModel = action.payload
        }
    }
});


export const { setChats, setError, setCurrentChatId, setMessages, setIsChatLoading, setCurrentModel } = chatSlice.actions;
export default chatSlice.reducer;