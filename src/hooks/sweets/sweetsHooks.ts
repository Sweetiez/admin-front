import { useQuery } from 'react-query';
import { commonRequest } from '../common/request';
import ProductModel from '../../components/Products/ProductModel';
import CreateSweetRequest from './requests/CreateSweetRequest';
import PublishSweetRequest from './requests/PublishSweetRequest';

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

export async function publishSweet(publishSweetRequest: PublishSweetRequest) {
  const { data } = await commonRequest({
    url: `sweets/publish`,
    method: 'PUT',
    data: publishSweetRequest,
  });
  return data;
}
