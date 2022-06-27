import { useQuery } from 'react-query';
import { authenticatedRequest } from '../common/request';
import ProductModelRow from '../../components/Products/models/ProductModelRow';
import CreateSweetRequest from './requests/CreateSweetRequest';
import ProductModel from '../../components/Products/models/ProductModel';
import UpdateSweetRequest from './requests/UpdateSweetRequest';

export function useSweets() {
  return useQuery<ProductModelRow[], Error>(`all-sweets`, async () => {
    const { data } = await authenticatedRequest({
      url: `admin/sweets`,
    });
    return data;
  });
}

export function useSweetById(id: string) {
  return useQuery<ProductModel, Error>(`sweet-${id}`, async () => {
    if (id) {
      const { data } = await authenticatedRequest({
        url: `admin/sweets/${id}`,
      });
      return data;
    }
  });
}

export async function createSweet(createSweetRequest: CreateSweetRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/sweets`,
    method: 'POST',
    data: createSweetRequest,
  });
  return data;
}

export async function updateSweet(request: UpdateSweetRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/sweets`,
    method: 'PUT',
    data: request,
  });
  return data;
}
