import { useQuery } from 'react-query';
import AnimatorModel from '../../components/Events/Face/models/AnimatorModel';
import { authenticatedRequest } from '../common/request';

export function useAnimators() {
  return useQuery<AnimatorModel[], Error>(`all-animators`, async () => {
    const { data } = await authenticatedRequest({
      url: `/admin/animators`,
    });
    return data;
  });
}
