import { MeetingState } from "../types/meeting";

export function createResolution(meeting: MeetingState) {
  const approvals = meeting.votes.filter(
    (v) => v.decision !== "REJECT"
  ).length;

  const rejects = meeting.votes.filter(
    (v) => v.decision === "REJECT"
  ).length;

  meeting.resolution = {
    approved: approvals > rejects,

    votesFor: approvals,

    votesAgainst: rejects,

    decision:
      approvals > rejects
        ? "APPROVED"
        : "REJECTED",

    summary:
      approvals > rejects
        ? "The executive board approved the proposal."
        : "The executive board rejected the proposal.",
  };
}