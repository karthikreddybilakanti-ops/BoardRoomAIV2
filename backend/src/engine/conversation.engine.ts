import { getMeeting, updateMeeting } from "../memory/meeting.store";

import { CEOAgent } from "../agents/ceo.agent";
import { CFOAgent } from "../agents/cfo.agent";
import { CMOAgent } from "../agents/cmo.agent";
import { COOAgent } from "../agents/coo.agent";
import { CROAgent } from "../agents/cro.agent";

import { Executive } from "../types/meeting";
import { detectIntent } from "../router/intent.router";

import { runVoting } from "./voting.engine";
import { createResolution } from "./resolution.engine";

const ORDER: Executive[] = [
  "CEO",
  "CFO",
  "CMO",
  "COO",
  "CRO",
];

function nextSpeaker(current: Executive): Executive {
  const index = ORDER.indexOf(current);

  if (index === ORDER.length - 1) {
    return "CEO";
  }

  return ORDER[index + 1];
}

async function generateReply(
  role: Executive,
  meeting: any
): Promise<string> {
  switch (role) {
    case "CEO":
      return CEOAgent(meeting);

    case "CFO":
      return CFOAgent(meeting);

    case "CMO":
      return CMOAgent(meeting);

    case "COO":
      return COOAgent(meeting);

    case "CRO":
      return CROAgent(meeting);

    default:
      return "";
  }
}

function simpleReply(message: string) {
  return {
    success: true,
    speaker: "CEO",
    message,
  };
}

export async function processUserMessage(
  meetingId: string,
  message: string
) {
  const meeting = getMeeting(meetingId);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  const intent = detectIntent(message);

  // Ignore greetings during an active meeting
  if (
    meeting.history.length > 0 &&
    (intent === "GREETING" ||
      intent === "THANKS" ||
      intent === "GOODBYE")
  ) {
    return {
      ...simpleReply(
        "The board meeting is currently in progress. Please ask a business question or address one of the executives."
      ),
      history: meeting.history,
      currentSpeaker: meeting.currentSpeaker,
      finished: meeting.finished,
    };
  }

  if (message !== "__CONTINUE__") {
    meeting.history.push({
      speaker: "USER",
      content: message,
      timestamp: Date.now(),
    });
  }

  let speaker: Executive = meeting.currentSpeaker;

  switch (intent) {
    case "CEO":
      speaker = "CEO";
      break;

    case "CFO":
      speaker = "CFO";
      break;

    case "CMO":
      speaker = "CMO";
      break;

    case "COO":
      speaker = "COO";
      break;

    case "CRO":
      speaker = "CRO";
      break;

    default:
      speaker = meeting.currentSpeaker;
  }

  const reply = await generateReply(speaker, meeting);

  meeting.history.push({
    speaker,
    content: reply,
    timestamp: Date.now(),
  });
    // -------------------------------------------------
  // If CRO has finished speaking,
  // CEO concludes + voting + resolution
  // -------------------------------------------------

  if (speaker === "CRO") {
    meeting.currentSpeaker = "CEO";

    const ceoConclusion = await CEOAgent(meeting);

    meeting.history.push({
      speaker: "CEO",
      content: ceoConclusion,
      timestamp: Date.now(),
    });

    meeting.votes = await runVoting(meeting);

    createResolution(meeting);

    meeting.finished = true;

    updateMeeting(meeting);

    return {
      success: true,

      speaker: "CEO",

      message: ceoConclusion,

      history: meeting.history,

      currentSpeaker: "CEO",

      finished: true,

      votes: meeting.votes,

      resolution: meeting.resolution,
    };
  }

  // ---------------------------------------
  // Continue normal discussion
  // ---------------------------------------

  meeting.currentSpeaker = nextSpeaker(speaker);

  updateMeeting(meeting);

  return {
    success: true,

    speaker,

    message: reply,

    history: meeting.history,

    currentSpeaker: meeting.currentSpeaker,

    finished: meeting.finished,

    votes: meeting.votes,

    resolution: meeting.resolution,
  };
}