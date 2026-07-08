"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingManager = void 0;
const event_queue_1 = require("./event.queue");
class MeetingManager {
    queue = new event_queue_1.EventQueue();
}
exports.MeetingManager = MeetingManager;
