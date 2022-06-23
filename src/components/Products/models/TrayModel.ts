import ProductModel from './ProductModel';

export default class TrayModel {
  id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  state: string | undefined;
  description: string | undefined;
  sweets: ProductModel[] | undefined;
  images: string[] | undefined;
  highlight: string | undefined;
  flavor: string | undefined;
  rating: number | undefined;
}
