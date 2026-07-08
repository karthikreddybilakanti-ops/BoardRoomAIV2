export type Executive = "CEO" | "CFO" | "CMO" | "COO" | "CRO";

export interface Message {
  speaker: Executive | "USER";
  content: string;
  timestamp: number;
}

export interface Vote {
  executive: Executive;

  decision: "APPROVE" | "REJECT" | "APPROVE_WITH_CONDITIONS";

  confidence: number;

  reason: string;
}

export interface Resolution {
  decision: string;

  summary: string;

  approved: boolean;

  votesFor: number;

  votesAgainst: number;
}

export interface MeetingState {
  id: string;

  problem: string;

  history: Message[];

  currentSpeaker: Executive;

  finished: boolean;

  createdAt: number;

  updatedAt: number;

  votes: Vote[];

  resolution?: Resolution;
}