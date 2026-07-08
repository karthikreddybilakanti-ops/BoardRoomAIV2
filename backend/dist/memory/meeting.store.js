"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMeeting = createMeeting;
exports.getMeeting = getMeeting;
exports.updateMeeting = updateMeeting;
exports.deleteMeeting = deleteMeeting;
exports.getAllMeetings = getAllMeetings;
const meetings = new Map();
function createMeeting(meeting) {
    meetings.set(meeting.id, meeting);
}
function getMeeting(id) {
    return meetings.get(id);
}
function updateMeeting(meeting) {
    meeting.updatedAt = Date.now();
    meetings.set(meeting.id, meeting);
}
function deleteMeeting(id) {
    return meetings.delete(id);
}
function getAllMeetings() {
    return Array.from(meetings.values());
}
