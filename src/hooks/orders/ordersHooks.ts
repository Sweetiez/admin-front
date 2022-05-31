import { useQuery } from 'react-query';
import { authenticatedRequest } from '../common/request';
import OrderModel from '../../components/Orders/models/OrderModel';

export function useOrders() {
  return useQuery<OrderModel[], Error>(`all-orders`, async () => {
    const { data } = await authenticatedRequest({
      url: `admin/order`,
    });
    return data;
  });
}
