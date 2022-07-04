export default class RoleModel {
  id: number | undefined;
  name: string | undefined;
}

export class RoleModelRequest {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
