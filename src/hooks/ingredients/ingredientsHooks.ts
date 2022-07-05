import CreateIngredientRequest from '../ingredients/requests/CreateIngredientRequest';
import { authenticatedRequest } from '../common/request';
import { useQuery } from 'react-query';
import IngredientModel from '../../components/Ingredients/models/IngredientModel';

export function useIngredients() {
  return useQuery<IngredientModel[], Error>(`all-ingredients`, async () => {
    const { data } = await authenticatedRequest({
      url: `admin/ingredients`,
    });
    return data;
  });
}

export async function createIngredient(request: CreateIngredientRequest) {
  const { data } = await authenticatedRequest({
    url: `/admin/ingredients`,
    method: 'POST',
    data: request,
  });
  return data;
}

export async function deleteIngredient(id: string) {
  const { data } = await authenticatedRequest({
    url: `/admin/ingredients/${id}`,
    method: 'DELETE',
  });
  return data;
}
