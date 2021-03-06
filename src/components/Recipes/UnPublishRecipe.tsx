import React from 'react';
import { useTranslation } from 'react-i18next';
import RecipeModel from './models/RecipeModel';
import UnPublishRecipeRequest from '../../hooks/recipes/requests/UnPublishRecipeRequest';
import { unPublishRecipe } from '../../hooks/recipes/recipesHooks';
import { useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';

interface UnPublishRecipeProps {
  recipe: RecipeModel;
  setOpenedModal: (value: boolean) => void;
}

const UnPublishRecipe: React.FC<UnPublishRecipeProps> = ({
  recipe,
  setOpenedModal,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  async function handleUnPublishRecipe(recipe: RecipeModel) {
    const request = new UnPublishRecipeRequest(recipe);
    const result = await unPublishRecipe(request);
    await queryClient.invalidateQueries('all-recipes');
    addToast(`${t('recipes.unpublished.alert.success')}: ${result.title}`, {
      appearance: 'info',
      autoDismiss: true,
    });
    setOpenedModal(false);
  }

  return (
    <>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg
              className="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
              id="modal-title"
            >
              {t('recipes.unpublished.title')}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-200">
                {t('recipes.unpublished.message')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-gray-900">
        <button
          onClick={() => handleUnPublishRecipe(recipe)}
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          {t('recipes.unpublished.submit')}
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

export default UnPublishRecipe;
