export default class CreateSweetRequest {
  name: string | undefined;
  price: number | undefined;
  unitPerPackage: number | undefined;
  ingredients: string[] | undefined;
  description: string | undefined;
  flavor: string | undefined;

  constructor(
    name: string | undefined,
    price: number | undefined,
    unitPerPackage: number | undefined,
    ingredients: string[] | undefined,
    description: string | undefined,
    flavor: string | undefined,
  ) {
    this.name = name;
    this.price = price;
    this.unitPerPackage = unitPerPackage;
    this.ingredients = ingredients;
    this.description = description;
    this.flavor = flavor;
  }
}
