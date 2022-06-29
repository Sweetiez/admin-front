import { useQuery } from 'react-query';
import { authenticatedRequest } from '../common/request';
import DashboardModel from '../../components/Dashboard/models/DashboardModel';

export function useDashboard() {
  return useQuery<DashboardModel, Error>(`dashboard`, async () => {
    const { data } = await authenticatedRequest({
      url: `admin/dashboard`,
    });
    return data;
  });
}
