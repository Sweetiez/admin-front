import { useQuery } from 'react-query';
import { commonRequest } from '../utils/request';
import ProductModel from '../../components/Products/ProductModel';
import CreateSweetRequest from './CreateSweetRequest';

export function useSweets() {
  return useQuery<ProductModel[], Error>(`all-sweets`, async () => {
    const { data } = await commonRequest({
      url: `sweets`,
    });

    return data;
  });
}

export async function createSweet(createSweetRequest: CreateSweetRequest) {
  const { data } = await commonRequest({
    url: `sweets`,
    method: 'POST',
    data: createSweetRequest,
  });

  return data;
}
