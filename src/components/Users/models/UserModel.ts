import RoleModel from './RoleModel';

export default class UserModel {
  id: string | undefined;
  email: string | undefined;
  roles: RoleModel[] | undefined;

  constructor(id: string, email: string, roles: RoleModel[]) {
    this.id = id;
    this.email = email;
    this.roles = roles;
  }
}
