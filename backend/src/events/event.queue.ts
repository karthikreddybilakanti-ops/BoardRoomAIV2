import { MeetingEvent } from "./event.types";

export class EventQueue {
  private events: MeetingEvent[] = [];

  push(event: MeetingEvent) {
    this.events.push(event);
  }

  pop() {
    return this.events.shift();
  }

  all() {
    return this.events;
  }
}