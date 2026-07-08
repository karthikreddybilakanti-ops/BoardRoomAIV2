import { randomUUID } from "crypto";

import { CEOAgent } from "../agents/ceo.agent";

import { createMeeting, updateMeeting } from "../memory/meeting.store";

import { MeetingState } from "../types/meeting";

export async function runMeeting(problem: string) {
  const meeting: MeetingState = {
    id: randomUUID(),

    problem,

    history: [],

    currentSpeaker: "CEO",

    finished: false,

    createdAt: Date.now(),

    updatedAt: Date.now(),

    votes: [],

    resolution: undefined,
  };

  createMeeting(meeting);

  const ceoReply = await CEOAgent(meeting);

  meeting.history.push({
    speaker: "CEO",
    content: ceoReply,
    timestamp: Date.now(),
  });

  meeting.currentSpeaker = "CFO";

  updateMeeting(meeting);

  return {
    success: true,
    meetingId: meeting.id,
    currentSpeaker: meeting.currentSpeaker,
    history: meeting.history,
    votes: meeting.votes,
    resolution: meeting.resolution,
    finished: meeting.finished,
  };
}