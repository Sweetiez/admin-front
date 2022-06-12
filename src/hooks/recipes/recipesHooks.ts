import CreateRecipeRequest from './requests/CreateRecipeRequest';
import { authenticatedRequest } from '../common/request';
import { useQuery } from 'react-query';
import RecipeModel from '../../components/Recipes/models/RecipeModel';
import PublishRecipeRequest from './requests/PublishRecipeRequest';
import UnPublishRecipeRequest from './requests/UnPublishRecipeRequest';
import UpdateRecipeStepsRequest from './requests/UpdateRecipeStepsRequest';
import DeleteImageRequest from '../sweets/requests/DeleteImageRequest';
import UpdateRecipeRequest from './requests/UpdateRecipeRequest';

export function useRecipes() {
  return useQuery<RecipeModel[], Error>(`all-recipes`, async () => {
    const { data } = await authenticatedRequest({
      url: `admin/recipes`,
    });
    return data;
  });
}

export function useRecipeDetail(id: string) {
  return useQuery<RecipeModel, Error>(`recipe-${id}`, async () => {
    const { data } = await authenticatedRequest({
      url: `admin/recipes/${id}`,
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

export async function updateRecipe(request: UpdateRecipeRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/recipes/${request.id}`,
    method: 'PUT',
    data: request,
  });
  return data;
}

export async function updateRecipeStep(request: UpdateRecipeStepsRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/recipes/step`,
    method: 'PUT',
    data: request,
  });
  return data;
}

export async function deleteRecipeImage(
  id: string,
  request: DeleteImageRequest,
) {
  const { data } = await authenticatedRequest({
    url: `admin/recipes/${id}/image`,
    method: 'DELETE',
    data: request,
  });

  return data;
}

export async function uploadRecipeImage(sweetId: string, image: File) {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await authenticatedRequest({
    url: `admin/recipes/${sweetId}/image`,
    method: 'POST',
    data: formData,
  });

  return data;
}

export async function publishRecipe(request: PublishRecipeRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/recipes/publish`,
    method: 'PUT',
    data: request,
  });
  return data;
}

export async function unPublishRecipe(request: UnPublishRecipeRequest) {
  const { data } = await authenticatedRequest({
    url: `admin/recipes/publish`,
    method: 'DELETE',
    data: request,
  });
  return data;
}
