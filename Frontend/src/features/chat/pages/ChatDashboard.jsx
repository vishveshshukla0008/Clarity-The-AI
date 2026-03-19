import { MessageCircle, Microchip, Menu, X, FolderOpenDot } from "lucide-react";
import { useState } from "react";
import { useChat } from "../hooks/useChat";

export default function ChatDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { handleSendMessage } = useChat();




  const chats = [
    "Project Brainstorm",
    "Daily Standup Notes",
    "AI Model Discussion",
    "Frontend Bug Fixes",
    "Backend API Planning",
    "Design Review Session",
    "MERN Stack Ideas",
    "Deployment Strategy Talk",
    "Feature Roadmap Planning",
    "Debugging Late Night",
  ];

  const messages = [
    { role: "user", content: "Hey, what is MERN stack?" },
    {
      role: "ai",
      content: "MERN stack stands for MongoDB, Express, React, and Node.js.",
    },
    { role: "user", content: "Can I build real-time apps with it?" },
    {
      role: "ai",
      content:
        "Yes, you can use WebSockets or libraries like Socket.io to build real-time apps.",
    },
  ];

  return (
    <div className="min-h-180 inset-0 w-full flex bg-olive-900 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 md:static z-40 top-0 left-0 min-h-180 w-64 bg-mauve-900 p-3 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Chats</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex flex-col ">
          {chats.map((chat, i) => (
            <div
              key={i}
              className="hover:bg-mauve-800 p-2 cursor-pointer px-3 text-sm flex items-center gap-2 rounded">
              <Microchip size={16} />
              {chat}
            </div>
          ))}
        </div>
      </aside>

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-mauve-950">
          <button onClick={() => setSidebarOpen(true)}>
            <FolderOpenDot />
          </button>
          <h1 className="text-lg font-semibold">Chat</h1>
          <div />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${msg.role === "ai" ? "text-left" : "text-right"}`}>
                <span
                  className={`inline-block px-3 py-2 rounded-lg text-left ${
                    msg.role === "user" ? "bg-lime-800" : "bg-mauve-950"
                  }`}>
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => handleSendMessage({message : "Hello How are you ?"})}>Send</button>
    </div>
  );
}
