export default class IngredientModel {
  id: string | undefined;
  name: string | undefined;
  constructor(id: string | undefined, name: string | undefined) {
    this.id = id;
    this.name = name;
  }
}
