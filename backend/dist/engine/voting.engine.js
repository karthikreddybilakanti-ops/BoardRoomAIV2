"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runVoting = runVoting;
const gemini_service_1 = require("../services/gemini.service");
const EXECUTIVES = ["CEO", "CFO", "CMO", "COO", "CRO"];
async function runVoting(meeting) {
    const history = meeting.history
        .map((m) => `${m.speaker}: ${m.content}`)
        .join("\n");
    const votes = [];
    for (const executive of EXECUTIVES) {
        const prompt = `
You are the ${executive}.

Business Problem:
${meeting.problem}

Discussion:
${history}

Vote using exactly this JSON format:

{
 "decision":"APPROVE",
 "confidence":85,
 "reason":"One sentence."
}

Decision must be one of:

APPROVE
REJECT
APPROVE_WITH_CONDITIONS

Return ONLY JSON.
`;
        try {
            const response = await (0, gemini_service_1.askGemini)(prompt);
            const parsed = JSON.parse(response);
            votes.push({
                executive,
                decision: parsed.decision,
                confidence: parsed.confidence,
                reason: parsed.reason,
            });
        }
        catch {
            votes.push({
                executive,
                decision: "APPROVE_WITH_CONDITIONS",
                confidence: 60,
                reason: "Default vote due to parsing failure.",
            });
        }
    }
    return votes;
}
