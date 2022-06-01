import { useQuery } from 'react-query';
import { authenticatedRequest } from '../common/request';
import OrderModel from '../../components/Orders/models/OrderModel';
import UpdateOrderStatusRequest from './requests/UpdateOrderStatusRequest';

export function useOrders() {
  return useQuery<OrderModel[], Error>(`all-orders`, async () => {
    const { data } = await authenticatedRequest({
      url: `admin/order`,
    });
    return data;
  });
}

export async function updateOrderStatus(
  id: string,
  request: UpdateOrderStatusRequest,
) {
  const { data } = await authenticatedRequest({
    url: `admin/order/${id}`,
    method: 'PUT',
    data: request,
  });
  return data;
}
