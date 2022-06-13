import StepModel from './StepModel';

export default class RecipeModel {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  difficulty: string | undefined;
  cost: string | undefined;
  people: string | undefined;
  preparationTime: string | undefined;
  chillTime: string | undefined;
  cookTime: string | undefined;
  images: string[] | undefined;
  steps: StepModel[] | undefined;
  state: string | undefined;
}
