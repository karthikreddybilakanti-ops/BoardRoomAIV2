"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUserMessage = processUserMessage;
const meeting_store_1 = require("../memory/meeting.store");
const ceo_agent_1 = require("../agents/ceo.agent");
const cfo_agent_1 = require("../agents/cfo.agent");
const cmo_agent_1 = require("../agents/cmo.agent");
const coo_agent_1 = require("../agents/coo.agent");
const cro_agent_1 = require("../agents/cro.agent");
const intent_router_1 = require("../router/intent.router");
const voting_engine_1 = require("./voting.engine");
const resolution_engine_1 = require("./resolution.engine");
const ORDER = [
    "CEO",
    "CFO",
    "CMO",
    "COO",
    "CRO",
];
function nextSpeaker(current) {
    const index = ORDER.indexOf(current);
    if (index === ORDER.length - 1) {
        return "CEO";
    }
    return ORDER[index + 1];
}
async function generateReply(role, meeting) {
    switch (role) {
        case "CEO":
            return (0, ceo_agent_1.CEOAgent)(meeting);
        case "CFO":
            return (0, cfo_agent_1.CFOAgent)(meeting);
        case "CMO":
            return (0, cmo_agent_1.CMOAgent)(meeting);
        case "COO":
            return (0, coo_agent_1.COOAgent)(meeting);
        case "CRO":
            return (0, cro_agent_1.CROAgent)(meeting);
        default:
            return "";
    }
}
function simpleReply(message) {
    return {
        success: true,
        speaker: "CEO",
        message,
    };
}
async function processUserMessage(meetingId, message) {
    const meeting = (0, meeting_store_1.getMeeting)(meetingId);
    if (!meeting) {
        throw new Error("Meeting not found");
    }
    const intent = (0, intent_router_1.detectIntent)(message);
    // Ignore greetings during an active meeting
    if (meeting.history.length > 0 &&
        (intent === "GREETING" ||
            intent === "THANKS" ||
            intent === "GOODBYE")) {
        return {
            ...simpleReply("The board meeting is currently in progress. Please ask a business question or address one of the executives."),
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
    let speaker = meeting.currentSpeaker;
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
        const ceoConclusion = await (0, ceo_agent_1.CEOAgent)(meeting);
        meeting.history.push({
            speaker: "CEO",
            content: ceoConclusion,
            timestamp: Date.now(),
        });
        meeting.votes = await (0, voting_engine_1.runVoting)(meeting);
        (0, resolution_engine_1.createResolution)(meeting);
        meeting.finished = true;
        (0, meeting_store_1.updateMeeting)(meeting);
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
    (0, meeting_store_1.updateMeeting)(meeting);
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
