import { useQuery } from 'react-query';
import { authenticatedRequest } from '../common/request';
import RewardModel from '../../components/rewads/models/RewardModel';
import CreateRewardRequest from './requests/CreateRewardRequest';
import ChangeStateRewardRequest from './requests/ChangeStateRewardRequest';
import UpdateRewardRequest from './requests/UpdateRewardRequest';

export function useRewards() {
  return useQuery<RewardModel[], Error>(`rewards`, async () => {
    const { data } = await authenticatedRequest({
      url: `admin/rewards`,
    });

    return data;
  });
}

export function createReward(request: CreateRewardRequest) {
  return authenticatedRequest({
    url: `admin/rewards`,
    method: 'POST',
    data: request,
  });
}

export function updateReward(request: UpdateRewardRequest) {
  return authenticatedRequest({
    url: `admin/rewards`,
    method: 'PUT',
    data: request,
  });
}

export function publishReward(request: ChangeStateRewardRequest) {
  return authenticatedRequest({
    url: `admin/rewards/publish`,
    method: 'PUT',
    data: request,
  });
}

export function unPublishReward(request: ChangeStateRewardRequest) {
  return authenticatedRequest({
    url: `admin/rewards/publish`,
    method: 'DELETE',
    data: request,
  });
}
