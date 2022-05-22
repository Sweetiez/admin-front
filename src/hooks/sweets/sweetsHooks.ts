import { useQuery } from 'react-query';
import { authenticatedRequest } from '../common/request';
import ProductModelRow from '../../components/Products/ProductModelRow';
import CreateSweetRequest from './requests/CreateSweetRequest';
import PublishSweetRequest from './requests/PublishSweetRequest';
import ProductModel from '../../components/Products/ProductModel';
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

export async function publishSweet(publishSweetRequest: PublishSweetRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/sweets/publish`,
    method: 'PUT',
    data: publishSweetRequest,
  });
  return data;
}

export async function uploadSweetImage(sweetId: string, image: File) {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await authenticatedRequest({
    url: `admin/sweets/${sweetId}/image`,
    method: 'POST',
    data: formData,
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
