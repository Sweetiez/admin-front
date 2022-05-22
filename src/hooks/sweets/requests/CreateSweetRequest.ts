import Ingredients from '../../../components/Products/Ingredients';

export default class CreateSweetRequest {
  name: string | undefined;
  price: number | undefined;
  ingredients: Ingredients[] | undefined;
  description: string | undefined;
  flavor: string | undefined;

  constructor(
    name: string | undefined,
    price: number | undefined,
    ingredients: Ingredients[] | undefined,
    description: string | undefined,
    flavor: string | undefined,
  ) {
    this.name = name;
    this.price = price;
    this.ingredients = ingredients;
    this.description = description;
    this.flavor = flavor;
  }
}
