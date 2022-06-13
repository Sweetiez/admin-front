import RecipeModel from '../../../components/Recipes/models/RecipeModel';
import StepModel from '../../../components/Recipes/models/StepModel';

export default class DeleteStepRequest {
  recipeId: string;
  stepId: string;

  constructor(recipe: RecipeModel, step: StepModel) {
    this.recipeId = recipe.id ? recipe.id : '';
    this.stepId = step.id ? step.id : '';
  }
}
