"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMOAgent = CMOAgent;
const gemini_service_1 = require("../services/gemini.service");
async function CMOAgent(meeting) {
    const history = meeting.history
        .map((m) => `${m.speaker}: ${m.content}`)
        .join("\n");
    const prompt = `
You are the Chief Marketing Officer (CMO).

Business Problem:
${meeting.problem}

Board Discussion:
${history}

YOUR ROLE
- Represent customers.
- Protect brand reputation.
- Increase market share.
- Challenge decisions that may damage customer trust.
- If finance focuses only on money, defend the customer.

Rules
- Think independently.
- Do not automatically agree.
- Mention competitors when useful.
- Explain customer impact.
- Ask one marketing question if appropriate.
- No bullet points.
- No markdown.
- 100-150 words.

Return ONLY the CMO response.
`;
    return await (0, gemini_service_1.askGemini)(prompt);
}
