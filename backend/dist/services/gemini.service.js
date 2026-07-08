"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askGemini = askGemini;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generative_ai_1 = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});
async function askGemini(prompt) {
    try {
        console.log("🧠 Gemini Request Started");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
        console.log("✅ Gemini Response Received");
        if (!text) {
            throw new Error("Empty Gemini response");
        }
        return text;
    }
    catch (err) {
        console.error("❌ Gemini Error");
        console.error(err);
        if (err?.message) {
            console.error(err.message);
        }
        return "I need a moment to analyze the discussion further. Based on everything shared so far, my recommendation is to continue with a data-driven approach while minimizing unnecessary business risk.";
    }
}
