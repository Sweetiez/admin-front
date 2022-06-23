import Ingredient from "../../../components/Products/models/Ingredient";

export default class UpdateSweetRequest {
  id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  description: string | undefined;
  images: string[] | undefined;
  ingredients: string[] | undefined;
  highlight: string | undefined;
  state: string | undefined;
  flavor: string | undefined;
  rating: number | undefined;

  constructor(
    id: string | undefined,
    name: string | undefined,
    price: number | undefined,
    description: string | undefined,
    images: string[] | undefined,
    ingredients: string[] | undefined,
    highlight: string | undefined,
    state: string | undefined,
    flavor: string | undefined,
    rating: number | undefined,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.images = images;
    this.ingredients = ingredients;
    this.highlight = highlight;
    this.state = state;
    this.flavor = flavor;
    this.rating = rating;
  }
}
