import {
  AnimatorModel,
  AvailabilityModel,
  ScheduleModel,
} from '../../Face/models/FaceEventModel';

export default class OnlineEventModel {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  schedule: ScheduleModel | undefined;
  availability: AvailabilityModel | undefined;
  animator: AnimatorModel | undefined;
  status: string | undefined;
}
