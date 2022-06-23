export default class Ingredient {
  id: string | undefined;
  name: string | undefined;
  constructor(id: string | undefined, name: string | undefined) {
    this.id = id;
    this.name = name;
  }
}
