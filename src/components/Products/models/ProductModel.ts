import Ingredient from './Ingredient';

export default class ProductModel {
  id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  unitPerPackage: number | undefined;
  state: string | undefined;
  description: string | undefined;
  images: string[] | undefined;
  ingredients: Ingredient[] | undefined;
  highlight: string | undefined;
  flavor: string | undefined;
  rating: number | undefined;
}
