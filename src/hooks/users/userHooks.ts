import { authenticatedRequest } from '../common/request';
import FindUserByRequest from './request/FindUserByRequest';
import { RoleModelRequest } from '../../components/Users/models/RoleModel';

export async function findByEmail(request: FindUserByRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/users/account`,
    method: 'POST',
    data: request,
  });
  return data;
}

export async function updateUserRole(id: string, request: RoleModelRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/roles/users/${id}`,
    method: 'PUT',
    data: { roles: request },
  });
  return data;
}
