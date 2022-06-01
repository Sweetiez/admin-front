export default class UpdateOrderStatusRequest {
  status: string;

  constructor(status: string) {
    this.status = status;
  }
}
