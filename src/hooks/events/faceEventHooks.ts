import { authenticatedRequest } from '../common/request';
import CreateFaceEventRequest from './requests/CreateFaceEventRequest';
import { useQuery } from 'react-query';
import EventModel from '../../components/rewads/models/EventModel';
import ReScheduleEventRequest from './requests/ReScheduleEventRequest';

export async function createFaceEvent(request: CreateFaceEventRequest) {
  const { data } = await authenticatedRequest({
    url: `/admin/events/face-to-face`,
    method: 'POST',
    data: request,
  });
  return data;
}

export function useFaceEvent() {
  return useQuery<EventModel[], Error>(`all-face-events`, async () => {
    const { data } = await authenticatedRequest({
      url: `/admin/events/face-to-face`,
    });
    return data;
  });
}

export async function publishFaceEvent(id: string) {
  const { data } = await authenticatedRequest({
    url: `/admin/events/face-to-face/publish/${id}`,
    method: 'PUT',
  });
  return data;
}

export async function cancelFaceEvent(id: string) {
  const { data } = await authenticatedRequest({
    url: `/admin/events/face-to-face/cancel/${id}`,
    method: 'PUT',
  });
  return data;
}

export async function reScheduleFaceEvent(request: ReScheduleEventRequest) {
  const { data } = await authenticatedRequest({
    url: `/admin/events/face-to-face/reschedule`,
    method: 'PUT',
    data: request,
  });
  return data;
}
