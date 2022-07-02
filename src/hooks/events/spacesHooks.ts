import CreateSpaceRequest from './requests/CreateSpaceRequest';
import { authenticatedRequest } from '../common/request';
import { useQuery } from 'react-query';
import SpaceModel from '../../components/Events/Face/models/SpaceModel';

export async function createSpace(request: CreateSpaceRequest) {
  const { data } = await authenticatedRequest({
    url: `/admin/spaces`,
    method: 'POST',
    data: request,
  });
  return data;
}

export function useSpaces() {
  return useQuery<SpaceModel[], Error>(`all-spaces`, async () => {
    const { data } = await authenticatedRequest({
      url: `/admin/spaces`,
    });
    return data;
  });
}
