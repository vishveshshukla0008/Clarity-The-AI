import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat slice",
    initialState: {
        chats: [],
        currentChatId: null,
        messages: [],
        isChatLoading: false,
        error: null
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
        }
    }
});


export const { setChats, setError, setCurrentChatId, setMessages, setIsChatLoading } = chatSlice.actions;
export default chatSlice.reducer;