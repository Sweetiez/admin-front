export default class CreateFaceEventRequest {
  title: string;
  description: string;
  startDateTime: string;
  duration: number;
  spaceId: string;
  animatorId: string;

  constructor(
    title: string,
    description: string,
    startDateTime: string,
    duration: number,
    spaceId: string,
    animatorId: string,
  ) {
    this.title = title;
    this.description = description;
    this.startDateTime = startDateTime;
    this.duration = duration;
    this.spaceId = spaceId;
    this.animatorId = animatorId;
  }
}
