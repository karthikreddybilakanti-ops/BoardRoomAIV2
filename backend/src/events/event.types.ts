export type EventType =
  | "EXECUTIVE"
  | "USER"
  | "SYSTEM";

export interface MeetingEvent {
  id: string;

  type: EventType;

  speaker: string;

  message: string;

  timestamp: number;
}