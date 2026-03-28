import {
  MessageCircle,
  Microchip,
  X,
  FolderOpenDot,
  Send,
  Loader,
  PencilLine,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useChat } from "../hooks/useChat";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { setCurrentChatId, setCurrentModel } from "../chat.slice";

export default function ChatDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const messagesEndRef = useRef(null);
  const { chats, isChatLoading, currentChatId, messages, currentModel } =
    useSelector((state) => state.chats);

  const dispatch = useDispatch();
  const { handleFetchChats, fetchAllMessagesOfChatHandler, handleSendMessage } =
    useChat();

  useEffect(() => {
    handleFetchChats();
  }, [handleFetchChats]);

  useEffect(() => {
    if (!currentChatId) return;
    fetchAllMessagesOfChatHandler(currentChatId);
  }, [currentChatId, fetchAllMessagesOfChatHandler]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    handleSendMessage(messageInput);
    setMessageInput("");
  };

  return (
    <div className="h-screen inset-0 w-full flex bg-[#11111a] overflow-hidden no-scrollbar">
      <aside
        className={`fixed bottom-0 md:static z-100 top-0 overflow-scroll no-scrollbar left-0  w-64  p-3 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-lg font-bold">Chats</h2>

            <button className="flex items-center gap-1 text-sm hover:text-gray-300 transition">
              <PencilLine
                onClick={() => dispatch(setCurrentChatId(null))}
                size={13}
              />
            </button>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {isChatLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="p-2 px-3 flex items-center gap-2 rounded animate-pulse">
                  <div className="w-4 h-4 bg-gray-600 rounded shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-600 rounded w-32"></div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            Object.values(chats || {}).map((chat) => (
              <div
                onClick={() => {
                  dispatch(setCurrentChatId(chat._id));
                  setSidebarOpen(false);
                }}
                key={chat._id}
                className="hover:bg-mauve-800 p-2 cursor-pointer px-3 text-xs flex items-center gap-2 rounded">
                <Microchip size={16} />
                <ReactMarkdown>{chat.title}</ReactMarkdown>
              </div>
            ))
          )}
        </div>
      </aside>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen overflow-scroll no-scrollbar">
        <div className="md:hidden sticky top-0 z-20 flex items-center justify-between p-4 bg-mauve-950">
          <button onClick={() => setSidebarOpen(true)}>
            <FolderOpenDot />
          </button>
          <h1 className="text-lg font-semibold">Chat</h1>
          <div />
        </div>

        {currentChatId ? (
          <>
            <div className="flex-1 min-h-0 no-scrollbar overflow-y-auto p-4 sm:p-6 md:p-8">
              <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`${msg.role === "ai" ? "text-left" : "text-right"}`}>
                    <span
                      className={`inline-block px-4 py-2 rounded-lg max-w-xs sm:max-w-md md:max-w-2xl text-left wrap-break-word ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-100"
                      }`}>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </span>
                  </div>
                ))}

                {/* Loading Skeleton */}
                {isChatLoading && (
                  <div className="text-left">
                    <div className="inline-block px-4 py-3 rounded-lg bg-gray-700 animate-pulse">
                      <div className="flex flex-col gap-2">
                        <div className="w-32 h-3 bg-gray-600 rounded"></div>
                        <div className="w-48 h-3 bg-gray-600 rounded"></div>
                        <div className="w-40 h-3 bg-gray-600 rounded"></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Section - Bottom */}
            <div className="border-t border-gray-700 bg-[#11111a] p-4">
              <form
                onSubmit={handleSubmitMessage}
                className="w-full max-w-3xl mx-auto flex gap-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Ask me something..."
                  className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Model Selector */}
                <div className="w-28 sm:w-36 ">
                  <select
                    onChange={(e) => dispatch(setCurrentModel(e.target.value))}
                    defaultValue="gemini"
                    className="w-full bg-gray-800 text-white rounded-lg  sm:px-3 py-2
      text-xs sm:text-sm md:text-base border-none
      ">
                    <option disabled>Select model</option>
                    <option value="gemini" className="">
                      Gemini
                    </option>
                    <option value="mistral" className="">
                      Mistral
                    </option>
                    <option value="tavily" className="">
                      Tavily AI Search
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!messageInput.trim() || isChatLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition">
                  {isChatLoading ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <MessageCircle size={64} className="text-gray-500 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Welcome to Clarity
            </h1>
            <p className="text-gray-400 text-lg text-center mb-12 max-w-2xl">
              Ship something great, tell me how I can help. Start a new
              conversation or select an existing chat from the sidebar.
            </p>

            <form
              onSubmit={handleSubmitMessage}
              className="w-full max-w-3xl mx-auto flex items-center gap-2 sm:gap-3">
              {/* Input */}
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Ask me something..."
                className="flex-1 bg-gray-800 text-white rounded-lg px-3 sm:px-4 py-2
    text-sm sm:text-base
    focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Model Selector */}
              <div className="w-28 sm:w-36 ">
                <select
                  onChange={(e) => dispatch(setCurrentModel(e.target.value))}
                  defaultValue="gemini"
                  className="w-full bg-gray-800 text-white rounded-lg  sm:px-3 py-2
      text-xs sm:text-sm md:text-base
      transition">
                  <option value="gemini" className="">
                    Gemini
                  </option>
                  <option value="mistral" className="">
                    Mistral
                  </option>
                  <option value="tavily" className="">
                    Tavily AI Search
                  </option>
                </select>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={!messageInput.trim() || isChatLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
    text-white rounded-lg px-3 sm:px-4 py-2 
    flex items-center gap-2 transition">
                {isChatLoading ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
