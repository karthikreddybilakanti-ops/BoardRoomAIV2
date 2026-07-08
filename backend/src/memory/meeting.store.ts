import { MeetingState } from "../types/meeting";

const meetings = new Map<string, MeetingState>();

export function createMeeting(meeting: MeetingState): void {
  meetings.set(meeting.id, meeting);
}

export function getMeeting(id: string): MeetingState | undefined {
  return meetings.get(id);
}

export function updateMeeting(meeting: MeetingState): void {
  meeting.updatedAt = Date.now();
  meetings.set(meeting.id, meeting);
}

export function deleteMeeting(id: string): boolean {
  return meetings.delete(id);
}

export function getAllMeetings(): MeetingState[] {
  return Array.from(meetings.values());
}