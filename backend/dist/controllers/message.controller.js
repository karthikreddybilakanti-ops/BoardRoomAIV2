"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = sendMessage;
const conversation_engine_1 = require("../engine/conversation.engine");
async function sendMessage(req, res) {
    try {
        const { meetingId, message } = req.body;
        if (!meetingId || !message) {
            return res.status(400).json({
                success: false,
                error: "meetingId and message are required",
            });
        }
        const result = await (0, conversation_engine_1.processUserMessage)(meetingId, message);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Message processing failed",
        });
    }
}
