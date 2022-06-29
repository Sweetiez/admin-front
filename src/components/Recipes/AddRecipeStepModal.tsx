import React from 'react';
import RecipeModel from './models/RecipeModel';
import Lottie from 'react-lottie-player';
import animationJson from '../../assets/lotties/cooking.json';
import { useTranslation } from 'react-i18next';
import AddStepRecipeRequest from '../../hooks/recipes/requests/AddStepRecipeRequest';
import { createRecipeStep } from '../../hooks/recipes/recipesHooks';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface AddRecipeStepModalProps {
  recipe: RecipeModel;
  setOpenedModal: (openedModal: boolean) => void;
}

const AddRecipeStepModal: React.FC<AddRecipeStepModalProps> = ({
  recipe,
  setOpenedModal,
}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigate = useNavigate();

  async function submitStepRecipeCreation(event: any) {
    event.preventDefault();
    setOpenedModal(false);
    const request = new AddStepRecipeRequest(
      recipe,
      event.target.description.value,
    );
    await createRecipeStep(request);
    await queryClient.invalidateQueries('all-recipes');
    await queryClient.invalidateQueries(`recipe-${recipe.id}`);
    navigate(`/admin/recipes`);
  }

  return (
    <div className="overflow-x-auto">
      <div className="grid bg-white rounded-lg shadow-xl w-fit dark:bg-gray-800">
        <div className="flex justify-center py-4">
          <Lottie
            className="h-32 w-fit"
            loop
            animationData={animationJson}
            play
          />
        </div>

        <form onSubmit={submitStepRecipeCreation}>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('products.description')}
            </label>
            <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <div className="py-2 px-4 bg-white rounded-b-lg dark:bg-gray-800">
                <textarea
                  id="description"
                  className="dark:text-white block px-0 w-full text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder={`${t('products.description')}...`}
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button
              type="button"
              onClick={() => {
                setOpenedModal(false);
              }}
              className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              {t('recipes.button.cancel')}
            </button>
            <input
              type="submit"
              value={t('recipes.edit.step.add')}
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeStepModal;
