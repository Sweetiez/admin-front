export default class EventModel {
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

class ScheduleModel {
  start: string | undefined;
  end: string | undefined;
}

class AvailabilityModel {
  totalPlaces: number | undefined;
  placeTaken: number | undefined;
}

class AnimatorModel {
  id: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
}
