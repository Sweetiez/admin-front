import CreateIngredientRequest from "../ingredients/requests/CreateIngredientRequest";
import {authenticatedRequest} from "../common/request";
import {useQuery} from "react-query";
import Ingredient from "../../components/Products/models/Ingredient";

export function useIngredients() {
    return useQuery<Ingredient[], Error>(`all-ingredients`, async () => {
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