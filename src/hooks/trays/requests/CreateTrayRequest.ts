import ProductModel from '../../../components/Products/models/ProductModel';

export default class CreateTrayRequest {
  name: string | undefined;
  price: number | undefined;
  sweets: ProductModel[] | undefined;
  description: string | undefined;
  flavor: string | undefined;

  constructor(
    name: string | undefined,
    price: number | undefined,
    sweets: ProductModel[] | undefined,
    description: string | undefined,
    flavor: string | undefined,
  ) {
    this.name = name;
    this.price = price;
    this.sweets = sweets;
    this.description = description;
    this.flavor = flavor;
  }
}
