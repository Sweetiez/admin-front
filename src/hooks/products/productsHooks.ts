import { authenticatedRequest } from '../common/request';
import PublishProductRequest from './requests/publishProductRequest';
import UnPublishProductRequest from './requests/unpublishProductRequest';
import { useQuery } from 'react-query';
import ProductModel from '../../components/Products/models/ProductModel';
import TrayModel from '../../components/Products/models/TrayModel';

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
