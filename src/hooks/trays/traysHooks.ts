import { useQuery } from 'react-query';
import { authenticatedRequest } from '../common/request';
import TrayModel from '../../components/Products/models/TrayModel';
import ProductModelRow from '../../components/Products/models/ProductModelRow';
import CreateTrayRequest from './requests/CreateTrayRequest';
import UpdateTrayRequest from './requests/UpdateTrayRequest';

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
