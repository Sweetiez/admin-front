export default class UpdateRecipeRequest {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  cost: number;
  people: number;
  preparationTime: number;
  chillTime: number;
  cookTime: number;

  constructor(
    id: string,
    title: string,
    description: string,
    difficulty: string,
    cost: number,
    people: number,
    preparationTime: number,
    chillTime: number,
    cookTime: number,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.difficulty = difficulty;
    this.cost = cost;
    this.people = people;
    this.preparationTime = preparationTime;
    this.chillTime = chillTime;
    this.cookTime = cookTime;
  }
}
