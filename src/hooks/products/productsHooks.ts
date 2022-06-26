import { authenticatedRequest } from '../common/request';
import PublishProductRequest from './requests/publishProductRequest';
import UnPublishProductRequest from './requests/unpublishProductRequest';
import { useQuery } from 'react-query';
import ProductModel from '../../components/Products/models/ProductModel';
import TrayModel from '../../components/Products/models/TrayModel';
import DeleteImageRequest from '../sweets/requests/DeleteImageRequest';

export function useProductById(id: string, productType: string) {
  return useQuery<ProductModel | TrayModel, Error>(
    `${productType}-${id}`,
    async () => {
      if (id) {
        const { data } = await authenticatedRequest({
          url: `admin/${productType}/${id}`,
        });
        return data;
      }
    },
  );
}

export async function publishProduct(
  publishProductRequest: PublishProductRequest,
  productType: string,
) {
  const { data } = await authenticatedRequest({
    url: `admin/${productType}/publish`,
    method: 'PUT',
    data: publishProductRequest,
  });
  return data;
}

export async function unPublishProduct(
  unPublishProductRequest: UnPublishProductRequest,
  productType: string,
) {
  const { data } = await authenticatedRequest({
    url: `admin/${productType}/publish`,
    method: 'DELETE',
    data: unPublishProductRequest,
  });
  return data;
}

export async function uploadProductImage(
  id: string,
  image: File,
  productType: string,
) {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await authenticatedRequest({
    url: `admin/${productType}/${id}/image`,
    method: 'POST',
    data: formData,
  });

  return data;
}

export async function deleteProductImage(
  id: string,
  request: DeleteImageRequest,
  productType: string,
) {
  const { data } = await authenticatedRequest({
    url: `admin/${productType}/${id}/image`,
    method: 'DELETE',
    data: request,
  });

  return data;
}
