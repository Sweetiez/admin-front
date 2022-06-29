import React from 'react';
import RecipeModel from './models/RecipeModel';
import Lottie from 'react-lottie-player';
import animationJson from '../../assets/lotties/cooking.json';
import { useTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import PublishRecipeRequest from '../../hooks/recipes/requests/PublishRecipeRequest';
import { publishRecipe } from '../../hooks/recipes/recipesHooks';
import { useQueryClient } from 'react-query';

interface PublishRecipeProps {
  recipe: RecipeModel;
  setOpenedModal: (value: boolean) => void;
}

const PublishRecipe: React.FC<PublishRecipeProps> = ({
  recipe,
  setOpenedModal,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  async function handlePublishRecipe(recipe: RecipeModel) {
    const images = recipe.images ? recipe.images : [];
    if (images.length <= 0 || images[0] === '') {
      addToast(t('recipes.publish.alert.images'), {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    const request = new PublishRecipeRequest(recipe);
    const result = await publishRecipe(request);
    console.log(result);
    await queryClient.invalidateQueries('all-recipes');
    addToast(`${t('recipes.publish.alert.success')}: ${result.title}`, {
      appearance: 'info',
      autoDismiss: true,
    });
    setOpenedModal(false);
  }

  return (
    <>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
        <div className="sm:flex sm:items-start">
          <Lottie
            className="h-fit w-fit"
            loop
            animationData={animationJson}
            play
          />
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
              id="modal-title"
            >
              {t('recipes.publish.title')}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-200">
                {t('recipes.publish.message')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-gray-900">
        <button
          onClick={() => handlePublishRecipe(recipe)}
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          {t('recipes.publish.submit')}
        </button>
        <button
          onClick={() => {
            setOpenedModal(false);
          }}
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          {t('recipes.button.cancel')}
        </button>
      </div>
    </>
  );
};

export default PublishRecipe;
