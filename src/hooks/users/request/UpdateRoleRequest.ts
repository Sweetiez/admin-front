import RoleModel from "../../../components/Users/models/RoleModel";

export default class UpdateRoleRequest {
    roles: RoleModel[];


    constructor(roles: RoleModel[]) {
        this.roles = roles;
    }
}