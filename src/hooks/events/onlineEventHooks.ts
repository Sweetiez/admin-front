import { authenticatedRequest } from '../common/request';
import { useQuery } from 'react-query';
import ReScheduleEventRequest from './requests/ReScheduleEventRequest';
import CreateOnlineEventRequest from './requests/CreateOnlineEventRequest';
import OnlineEventModel from '../../components/Events/Stream/models/OnlineEventModel';

export async function createOnlineEvent(request: CreateOnlineEventRequest) {
  const { data } = await authenticatedRequest({
    url: `/admin/events/streaming`,
    method: 'POST',
    data: request,
  });
  return data;
}

export function useOnlineEvent() {
  return useQuery<OnlineEventModel[], Error>(`all-online-events`, async () => {
    const { data } = await authenticatedRequest({
      url: `/admin/events/streaming`,
    });
    return data;
  });
}

export async function publishOnlineEvent(id: string) {
  const { data } = await authenticatedRequest({
    url: `/admin/events/streaming/publish/${id}`,
    method: 'PUT',
  });
  return data;
}

export async function cancelOnlineEvent(id: string) {
  const { data } = await authenticatedRequest({
    url: `/admin/events/streaming/cancel/${id}`,
    method: 'PUT',
  });
  return data;
}

export async function reScheduleOnlineEvent(request: ReScheduleEventRequest) {
  const { data } = await authenticatedRequest({
    url: `/admin/events/streaming/reschedule`,
    method: 'PUT',
    data: request,
  });
  return data;
}
