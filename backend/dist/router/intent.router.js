"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectIntent = detectIntent;
function detectIntent(message) {
    const text = message.trim().toLowerCase();
    // Continue
    if (text === "__continue__") {
        return "CONTINUE";
    }
    // Greetings
    if (["hi", "hello", "hey", "good morning", "good evening"].includes(text)) {
        return "GREETING";
    }
    // Thanks
    if (["thanks", "thank you"].includes(text) ||
        text.startsWith("thank")) {
        return "THANKS";
    }
    // Goodbye
    if (["bye", "goodbye", "see you"].includes(text)) {
        return "GOODBYE";
    }
    // Explicit executive requests only
    if (text.includes("what does cfo") || text.includes("ask cfo") || text === "cfo") {
        return "CFO";
    }
    if (text.includes("what does cmo") || text.includes("ask cmo") || text === "cmo") {
        return "CMO";
    }
    if (text.includes("what does coo") || text.includes("ask coo") || text === "coo") {
        return "COO";
    }
    if (text.includes("what does cro") || text.includes("ask cro") || text === "cro") {
        return "CRO";
    }
    if (text.includes("what does ceo") || text.includes("ask ceo") || text === "ceo") {
        return "CEO";
    }
    // Everything else becomes board discussion
    return "DEBATE";
}
