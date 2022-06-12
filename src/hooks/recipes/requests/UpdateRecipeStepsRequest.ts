import StepModel from '../../../components/Recipes/models/StepModel';

export default class UpdateRecipeStepsRequest {
  recipeId: string;
  steps: StepModel[];

  constructor(id: string, steps: StepModel[]) {
    this.recipeId = id;
    this.steps = steps;
  }
}
