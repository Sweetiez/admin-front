export default class CreateRecipeRequest {
  title: string;
  description: string;
  difficulty: string;
  cost: number;
  people: number;
  preparationTime: number;
  chillTime: number;
  cookTime: number;

  constructor(
    title: string,
    description: string,
    difficulty: string,
    cost: number,
    people: number,
    preparationTime: number,
    chillTime: number,
    cookTime: number,
  ) {
    this.title = title;
    this.description = description;
    this.difficulty = difficulty;
    this.cost = cost;
    this.people = people;
    this.preparationTime = preparationTime;
    this.chillTime = chillTime;
    this.cookTime = cookTime;
  }

  public isValid(): boolean {
    return (
      this.isTitleValid() &&
      this.isDescriptionValid() &&
      this.isDifficultyValid() &&
      this.isCostValid() &&
      this.isPeopleValid() &&
      this.isPreparationTimeValid() &&
      this.isChillTimeValid() &&
      this.isCookTimeValid()
    );
  }

  private isTitleValid(): boolean {
    return !(this.title && this.title.trim() === '');
  }

  private isDescriptionValid(): boolean {
    return !(this.description.trim() === '');
  }

  private isDifficultyValid(): boolean {
    return !(this.difficulty.trim() === '');
  }

  private isCostValid(): boolean {
    return this.cost > 0;
  }

  private isPeopleValid(): boolean {
    return this.people > 0;
  }

  private isPreparationTimeValid(): boolean {
    return this.preparationTime > 0;
  }

  private isChillTimeValid(): boolean {
    return this.chillTime > 0;
  }

  private isCookTimeValid(): boolean {
    return this.cookTime > 0;
  }
}
