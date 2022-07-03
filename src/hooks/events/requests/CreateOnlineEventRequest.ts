export default class CreateOnlineEventRequest {
  animatorId: string;
  title: string;
  description: string;
  startDateTime: string;
  duration: number;
  places: number;

  constructor(
    animatorId: string,
    title: string,
    description: string,
    startDateTime: string,
    duration: number,
    places: number,
  ) {
    this.animatorId = animatorId;
    this.title = title;
    this.description = description;
    this.startDateTime = startDateTime;
    this.duration = duration;
    this.places = places;
  }
}
