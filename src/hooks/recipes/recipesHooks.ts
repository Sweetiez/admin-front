import CreateRecipeRequest from './requests/CreateRecipeRequest';
import { authenticatedRequest } from '../common/request';
import { useQuery } from 'react-query';
import RecipeModel from '../../components/Recipes/models/RecipeModel';

export function useRecipes() {
  return useQuery<RecipeModel[], Error>(`all-recipes`, async () => {
    const { data } = await authenticatedRequest({
      url: `admin/recipes`,
    });
    return data;
  });
}

export async function createRecipe(request: CreateRecipeRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/recipes`,
    method: 'POST',
    data: request,
  });
  return data;
}
