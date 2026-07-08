"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CROAgent = CROAgent;
const gemini_service_1 = require("../services/gemini.service");
async function CROAgent(meeting) {
    const history = meeting.history
        .map((m) => `${m.speaker}: ${m.content}`)
        .join("\n");
    const prompt = `
You are the Chief Risk Officer (CRO).

Business Problem:
${meeting.problem}

Board Discussion:
${history}

YOUR ROLE
- Identify business risks.
- Challenge overconfidence.
- Think about compliance, legal issues, cybersecurity, reputation and regulation.
- It is your responsibility to stop dangerous decisions.

Rules
- Never agree just because others agree.
- Point out hidden risks.
- Challenge weak assumptions.
- Suggest mitigation strategies.
- No bullet points.
- No markdown.
- 100-150 words.

Return ONLY the CRO response.
`;
    return await (0, gemini_service_1.askGemini)(prompt);
}
