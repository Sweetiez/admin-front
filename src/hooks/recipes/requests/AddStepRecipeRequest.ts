import RecipeModel from '../../../components/Recipes/models/RecipeModel';

export default class AddStepRecipeRequest {
  id: string;
  order: number;
  description: string;

  constructor(recipe: RecipeModel, description: string) {
    this.id = recipe.id ? recipe.id : '';
    this.order = recipe.steps?.length ? recipe.steps?.length + 1 : 1;
    this.description = description;
  }
}
