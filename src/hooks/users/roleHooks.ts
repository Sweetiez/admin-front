import { useQuery } from 'react-query';
import { authenticatedRequest } from '../common/request';
import RoleModel from '../../components/Users/models/RoleModel';
import AddRoleRequest from './request/AddRoleRequest';

export function useRoles() {
  return useQuery<RoleModel[], Error>(`all-roles`, async () => {
    const { data } = await authenticatedRequest({
      url: `roles`,
    });
    return data;
  });
}

export async function createRole(request: AddRoleRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/roles`,
    method: 'POST',
    data: request,
  });
  return data;
}

export async function updateRole(id: number, request: AddRoleRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/roles/${id}`,
    method: 'POST',
    data: request,
  });
  return data;
}
