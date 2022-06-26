import { useQuery } from 'react-query';
import { authenticatedRequest } from '../common/request';
import TrayModel from '../../components/Products/models/TrayModel';
import ProductModelRow from '../../components/Products/models/ProductModelRow';
import CreateTrayRequest from './requests/CreateTrayRequest';
import UpdateTrayRequest from './requests/UpdateTrayRequest';
import DeleteImageRequest from '../sweets/requests/DeleteImageRequest';
import UnPublishTrayRequest from './requests/UnPublishTrayRequest';
import PublishTrayRequest from './requests/PublishTrayRequest';

export function useTrays() {
  return useQuery<ProductModelRow[], Error>(`all-trays`, async () => {
    const { data } = await authenticatedRequest({
      url: `admin/trays`,
    });
    return data;
  });
}

export function useTrayById(id: string) {
  return useQuery<TrayModel, Error>(`tray-${id}`, async () => {
    if (id) {
      const { data } = await authenticatedRequest({
        url: `admin/trays/${id}`,
      });
      return data;
    }
  });
}

export async function createTray(createTrayRequest: CreateTrayRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/trays`,
    method: 'POST',
    data: createTrayRequest,
  });
  return data;
}

export async function updateTray(updateTrayRequest: UpdateTrayRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/trays`,
    method: 'PUT',
    data: updateTrayRequest,
  });
  return data;
}

export async function publishTray(publishProductRequest: PublishTrayRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/trays/publish`,
    method: 'PUT',
    data: publishProductRequest,
  });
  return data;
}

export async function unPublishTray(
  unPublishTrayRequest: UnPublishTrayRequest,
) {
  const { data } = await authenticatedRequest({
    url: `admin/trays/publish`,
    method: 'DELETE',
    data: unPublishTrayRequest,
  });
  return data;
}

export async function uploadTrayImage(trayId: string, image: File) {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await authenticatedRequest({
    url: `admin/trays/${trayId}/image`,
    method: 'POST',
    data: formData,
  });

  return data;
}

export async function deleteTrayImage(id: string, request: DeleteImageRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/trays/${id}/image`,
    method: 'DELETE',
    data: request,
  });

  return data;
}
