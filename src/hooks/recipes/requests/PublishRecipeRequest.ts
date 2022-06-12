import RecipeModel from '../../../components/Recipes/models/RecipeModel';

export default class PublishRecipeRequest {
  id: string;

  constructor(recipe: RecipeModel) {
    this.id = recipe.id ? recipe.id : '';
  }
}
