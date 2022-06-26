import SweetModel from '../../../components/Products/models/SweetModel';

export default class UpdateTrayRequest {
  id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  description: string | undefined;
  images: string[] | undefined;
  sweets: SweetModel[] | undefined;
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
    sweets: SweetModel[] | undefined,
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
    this.sweets = sweets;
    this.highlight = highlight;
    this.state = state;
    this.flavor = flavor;
    this.rating = rating;
  }
}
