import { Request, Response } from "express";
import { processUserMessage } from "../engine/conversation.engine";

export async function sendMessage(req: Request, res: Response) {
  try {
    const { meetingId, message } = req.body;

    if (!meetingId || !message) {
      return res.status(400).json({
        success: false,
        error: "meetingId and message are required",
      });
    }

    const result = await processUserMessage(meetingId, message);

       res.json(result);
        } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Message processing failed",
    });
  }
}