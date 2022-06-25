export default class SweetModel {
  sweetId: string | undefined;
  quantity: number | undefined;
  name: string | undefined;
  unitPerPackage: number | undefined;
  constructor(
    sweetId: string | undefined,
    quantity: number | undefined,
    name: string | undefined,
    unitPerPackage: number | undefined,
  ) {
    this.sweetId = sweetId;
    this.quantity = quantity;
    this.name = name;
    this.unitPerPackage = unitPerPackage;
  }
}
