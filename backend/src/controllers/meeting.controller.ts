import { Request, Response } from "express";
import { runMeeting } from "../engine/meeting.engine";

export async function startMeeting(req: Request, res: Response) {
  try {
    const { problem } = req.body;

    if (!problem || !problem.trim()) {
      return res.status(400).json({
        success: false,
        error: "Business problem is required.",
      });
    }

    console.log("=================================");
    console.log("🚀 Starting Board Meeting");
    console.log("📝 Problem:", problem);
    console.log("=================================");

    const meeting = await runMeeting(problem);

    console.log("✅ Meeting Generated Successfully");

    return res.status(200).json(meeting);
  } catch (error: any) {
    console.error("=================================");
    console.error("❌ Meeting Generation Failed");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: "Unable to generate board meeting.",
      error: error.message,
    });
  }
}