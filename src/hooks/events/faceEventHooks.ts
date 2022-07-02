import { authenticatedRequest } from '../common/request';
import CreateFaceEventRequest from './requests/CreateFaceEventRequest';

export async function createFaceEvent(request: CreateFaceEventRequest) {
  const { data } = await authenticatedRequest({
    url: `/admin/events/face-to-face`,
    method: 'POST',
    data: request,
  });
  return data;
}
