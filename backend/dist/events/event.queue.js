"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventQueue = void 0;
class EventQueue {
    events = [];
    push(event) {
        this.events.push(event);
    }
    pop() {
        return this.events.shift();
    }
    all() {
        return this.events;
    }
}
exports.EventQueue = EventQueue;
