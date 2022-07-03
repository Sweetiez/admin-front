export default class FaceEventModel {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  localisation: LocationModel | undefined;
  schedule: ScheduleModel | undefined;
  availability: AvailabilityModel | undefined;
  animator: AnimatorModel | undefined;
  status: string | undefined;
}

class LocationModel {
  id: string | undefined;
  address: string | undefined;
  zipCode: string | undefined;
  city: string | undefined;
}

export class ScheduleModel {
  start: string | undefined;
  end: string | undefined;
}

export class AvailabilityModel {
  totalPlaces: number | undefined;
  placeTaken: number | undefined;
}

export class AnimatorModel {
  id: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
}
