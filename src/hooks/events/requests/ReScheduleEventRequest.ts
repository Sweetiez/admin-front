export default class ReScheduleEventRequest {
  eventId: string;
  newStart: string;
  newDuration: number;

  constructor(eventId: string, newStart: string, newDuration: number) {
    this.eventId = eventId;
    this.newStart = newStart;
    this.newDuration = newDuration;
  }
}
