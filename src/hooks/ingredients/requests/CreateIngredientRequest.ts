export default class CreateIngredientRequest {
  name: string | undefined;

  constructor(name: string | undefined) {
    this.name = name;
  }
}
