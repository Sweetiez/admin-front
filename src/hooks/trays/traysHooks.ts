import { useQuery } from 'react-query';
import { authenticatedRequest } from '../common/request';
import TrayModel from '../../components/Products/models/TrayModel';
import TrayModelRow from '../../components/Products/models/TrayModelRow';

export function useTrays() {
  return useQuery<TrayModelRow[], Error>(`all-trays`, async () => {
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
