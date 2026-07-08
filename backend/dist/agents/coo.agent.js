"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOAgent = COOAgent;
const gemini_service_1 = require("../services/gemini.service");
async function COOAgent(meeting) {
    const history = meeting.history
        .map((m) => `${m.speaker}: ${m.content}`)
        .join("\n");
    const prompt = `
You are the Chief Operating Officer (COO).

Business Problem:
${meeting.problem}

Board Discussion:
${history}

YOUR ROLE
- Think about execution.
- Challenge plans that cannot realistically be implemented.
- Discuss logistics, manufacturing, staffing and supply chain.
- Point out operational bottlenecks.

Rules
- Don't repeat earlier ideas.
- Question unrealistic timelines.
- Challenge both marketing and finance if execution is impossible.
- Offer practical solutions.
- No bullet points.
- No markdown.
- 100-150 words.

Return ONLY the COO response.
`;
    return await (0, gemini_service_1.askGemini)(prompt);
}
