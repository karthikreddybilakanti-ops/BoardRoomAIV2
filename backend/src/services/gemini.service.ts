import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function askGemini(prompt: string): Promise<string> {
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
  } catch (err: any) {
    console.error("❌ Gemini Error");

    console.error(err);

    if (err?.message) {
      console.error(err.message);
    }

    return "I need a moment to analyze the discussion further. Based on everything shared so far, my recommendation is to continue with a data-driven approach while minimizing unnecessary business risk.";
  }
}