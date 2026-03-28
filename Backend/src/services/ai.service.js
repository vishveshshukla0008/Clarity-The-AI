import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  tool,
  createAgent,
} from "langchain";
import * as z from "zod";
import { searchInternet } from "./internet.service.js";

/* =========================
   MODELS
========================= */

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});


export async function generateChatTitle(message) {
  try {
    const response = await mistralModel.invoke([
      new SystemMessage(`
You generate short chat titles (2-4 words only).
No punctuation, no quotes, no extra text.
Only return the title.
      `),
      new HumanMessage(`Message: "${message}"`),
    ]);

    let title = response?.text?.trim();

    // fallback if model fails
    if (!title) {
      title = message?.slice(0, 20);
    }

    // clean + limit words
    title = title.replace(/[^a-zA-Z0-9 ]/g, "");
    const words = title.split(" ").slice(0, 4);
    title = words.join(" ");

    return title || "New Chat";
  } catch (err) {
    // guaranteed fallback
    return message?.slice(0, 20) || "New Chat";
  }
}


export const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description: "Use this tool to get latest information from internet!",
  schema: z.object({
    query: z.string().describe("Search query"),
  }),
});


export async function generateResponse(messages, model) {
  let selectedModel;
  let systemPrompt = "";
  let tools = [];

  // -----------------------------
  // MODEL SELECTION + PROMPTS
  // -----------------------------
  if (!model || model === "gemini") {
    selectedModel = geminiModel;

    systemPrompt = `
You are Gemini, an AI assistant developed by Google.

Rules:
- If asked "who are you", always respond: "I am Gemini."
- Do NOT use conversation history for identity questions.
- Be clear, structured, and helpful.
- Provide detailed answers when needed, but avoid unnecessary verbosity.
- If unsure, say you are uncertain instead of guessing.
`;
  } 
  else if (model === "mistral") {
    selectedModel = mistralModel;

    systemPrompt = `
You are Mistral, a fast and efficient AI assistant.

Rules:
- If asked "who are you", always respond: "I am Mistral."
- Ignore conversation history for identity questions.
- Keep responses short, direct, and useful.
- Prioritize speed and clarity.
- Say "I don't know" if unsure.
`;
  } 
  else if (model === "tavily") {
    selectedModel = geminiModel;
    tools = [searchInternetTool];

    systemPrompt = `
You are a web-enabled AI assistant.

Critical rules:
- You MUST use the searchInternet tool before answering factual, current, or time-sensitive questions.
- Always prefer fresh, verified information over memory.
- If search results are unavailable, clearly say you cannot verify the answer.

Identity rule:
- If asked "who are you", respond: "I am an AI assistant with web access."

Behavior:
- Be factual, precise, and evidence-based.
- Avoid speculation.
`;
  } 
  else {
    selectedModel = geminiModel;

    systemPrompt = `
You are a helpful AI assistant.
Provide accurate, clear, and useful answers.
If unsure, say so honestly.
`;
  }

  // -----------------------------
  // AGENT CREATION (FIXED)
  // -----------------------------
  const agent = createAgent({
    model: selectedModel,
    tools,
  });

  // -----------------------------
  // MESSAGE CONVERSION
  // -----------------------------
  const formattedMessages = messages
    .map((msg) => {
      if (msg.role === "user") return new HumanMessage(msg.content);
      if (msg.role === "ai") return new AIMessage(msg.content);
      return null;
    })
    .filter(Boolean);

  // -----------------------------
  // EXECUTION
  // -----------------------------
  try {
    const response = await agent.invoke({
      messages: [
        new SystemMessage(systemPrompt),
        ...formattedMessages,
      ],
    });

    return response.messages.at(-1)?.content || "No response";
  } catch (err) {
    console.error("Error generating response:", err);
    return "Something went wrong. Please try again.";
  }
}