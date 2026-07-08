"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMeeting = runMeeting;
const crypto_1 = require("crypto");
const ceo_agent_1 = require("../agents/ceo.agent");
const meeting_store_1 = require("../memory/meeting.store");
async function runMeeting(problem) {
    const meeting = {
        id: (0, crypto_1.randomUUID)(),
        problem,
        history: [],
        currentSpeaker: "CEO",
        finished: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        votes: [],
        resolution: undefined,
    };
    (0, meeting_store_1.createMeeting)(meeting);
    const ceoReply = await (0, ceo_agent_1.CEOAgent)(meeting);
    meeting.history.push({
        speaker: "CEO",
        content: ceoReply,
        timestamp: Date.now(),
    });
    meeting.currentSpeaker = "CFO";
    (0, meeting_store_1.updateMeeting)(meeting);
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
