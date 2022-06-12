import React from 'react';
import { capitalizeFirstLetter } from '../../hooks/utils/strings';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie-player';
import animationJson from '../../assets/lotties/cooking.json';
import CreateRecipeRequest from '../../hooks/recipes/requests/CreateRecipeRequest';
import { useToasts } from 'react-toast-notifications';
import { useMutation, useQueryClient } from 'react-query';
import ProductModelRow from '../Products/models/ProductModelRow';
import { createRecipe } from '../../hooks/recipes/recipesHooks';

interface CreateProductProps {
  setOpenedModal: (openedModal: boolean) => void;
}

const CreateRecipe: React.FC<CreateProductProps> = ({ setOpenedModal }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  const { mutate } = useMutation(createRecipe, {
    onSuccess: async (data: ProductModelRow) => {
      addToast(`${t('recipes.create.alert.success')}: ${data.name}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      await queryClient.invalidateQueries('all-recipes');
      setOpenedModal(false);
    },
    onError: (err: any) => {
      addToast(err.message, { appearance: 'error', autoDismiss: true });
    },
  });

  const submitRecipeCreation = async (event: any) => {
    event.preventDefault();

    const request = new CreateRecipeRequest(
      capitalizeFirstLetter(event.target.name.value),
      capitalizeFirstLetter(event.target.description.value),
      event.target.difficulty.value,
      Number(event.target.cost.value),
      Number(event.target.people.value),
      Number(event.target.preparationTime.value),
      Number(event.target.chillTime.value),
      Number(event.target.cookTime.value),
    );

    console.log(request);

    if (!request.isValid()) {
      addToast(`${t('recipes.create.alert.empty')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    mutate(request);
  };
  return (
    <div className="overflow-x-auto">
      <div className="grid bg-white rounded-lg shadow-xl w-fit">
        <div className="flex justify-center py-4">
          <Lottie
            className="h-32 w-fit"
            loop
            animationData={animationJson}
            play
          />
        </div>

        <form onSubmit={submitRecipeCreation}>
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
                {t('recipes.create.title')}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              {t('recipes.create.name')}
            </label>
            <input
              id="name"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('products.add.name')}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                {t('recipes.create.people')}
              </label>
              <input
                id="people"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="number"
                placeholder={t('recipes.create.people')}
                required
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                {t('recipes.create.cost')}
              </label>
              <input
                id="cost"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="number"
                placeholder={t('recipes.create.cost')}
                required
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                {t('recipes.create.difficulty')}
              </label>
              <select
                id="difficulty"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              >
                <option>NORMAL</option>
                <option>EASY</option>
                <option>HARD</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                {t('recipes.create.time.preparation')}
              </label>
              <input
                id="preparationTime"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="number"
                placeholder={t('recipes.create.time.minutes')}
                required
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                {t('recipes.create.time.chill')}
              </label>
              <input
                id="chillTime"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="number"
                placeholder={t('recipes.create.time.minutes')}
                required
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                {t('recipes.create.time.cooking')}
              </label>
              <input
                id="cookTime"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="number"
                placeholder={t('recipes.create.time.minutes')}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              {t('products.add.description')}
            </label>
            <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <div className="py-2 px-4 bg-white rounded-b-lg dark:bg-gray-800">
                <textarea
                  id="description"
                  className="block px-0 w-full text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder={`${t('products.add.description')}...`}
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
              {t('products.add.cancel_btn')}
            </button>
            <input
              type="submit"
              value={t('products.add.save_btn')}
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
