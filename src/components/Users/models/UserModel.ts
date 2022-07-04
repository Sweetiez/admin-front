import RoleModel from './RoleModel';

export default class UserModel {
  id: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  roles: RoleModel[] | undefined;
}
