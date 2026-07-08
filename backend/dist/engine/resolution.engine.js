"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResolution = createResolution;
function createResolution(meeting) {
    const approvals = meeting.votes.filter((v) => v.decision !== "REJECT").length;
    const rejects = meeting.votes.filter((v) => v.decision === "REJECT").length;
    meeting.resolution = {
        approved: approvals > rejects,
        votesFor: approvals,
        votesAgainst: rejects,
        decision: approvals > rejects
            ? "APPROVED"
            : "REJECTED",
        summary: approvals > rejects
            ? "The executive board approved the proposal."
            : "The executive board rejected the proposal.",
    };
}
