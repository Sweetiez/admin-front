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

    // const price = event.target.price.value;
    // const flavor = event.target.flavor.value;
    // const description = capitalizeFirstLetter(event.target.description.value);
    //
    // if (name === '' || price === '' || flavor === '' || description === '') {
    //     addToast(`${t('products.add.alert_failed_empty')}`, {
    //         appearance: 'error',
    //         autoDismiss: true,
    //     });
    //     return;
    // }
    //
    // const request = new CreateSweetRequest(
    //     name,
    //     Number(price),
    //     [],
    //     description,
    //     flavor,
    // );
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
              {/*<div className="flex justify-between items-center py-2 px-3 border-b dark:border-gray-600">*/}
              {/*  <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">*/}
              {/*    <div className="flex items-center space-x-1 sm:pr-4">*/}
              {/*      <button*/}
              {/*          type="button"*/}
              {/*          className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"*/}
              {/*      >*/}
              {/*        <svg*/}
              {/*            className="w-5 h-5"*/}
              {/*            fill="currentColor"*/}
              {/*            viewBox="0 0 20 20"*/}
              {/*            xmlns="http://www.w3.org/2000/svg"*/}
              {/*        >*/}
              {/*          <path*/}
              {/*              fillRule="evenodd"*/}
              {/*              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"*/}
              {/*              clipRule="evenodd"*/}
              {/*          ></path>*/}
              {/*        </svg>*/}
              {/*      </button>*/}
              {/*      <button*/}
              {/*          type="button"*/}
              {/*          className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"*/}
              {/*      >*/}
              {/*        <svg*/}
              {/*            className="w-5 h-5"*/}
              {/*            fill="currentColor"*/}
              {/*            viewBox="0 0 20 20"*/}
              {/*            xmlns="http://www.w3.org/2000/svg"*/}
              {/*        >*/}
              {/*          <path*/}
              {/*              fillRule="evenodd"*/}
              {/*              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"*/}
              {/*              clipRule="evenodd"*/}
              {/*          ></path>*/}
              {/*        </svg>*/}
              {/*      </button>*/}
              {/*      <button*/}
              {/*          type="button"*/}
              {/*          className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"*/}
              {/*      >*/}
              {/*        <svg*/}
              {/*            className="w-5 h-5"*/}
              {/*            fill="currentColor"*/}
              {/*            viewBox="0 0 20 20"*/}
              {/*            xmlns="http://www.w3.org/2000/svg"*/}
              {/*        >*/}
              {/*          <path*/}
              {/*              fillRule="evenodd"*/}
              {/*              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"*/}
              {/*              clipRule="evenodd"*/}
              {/*          ></path>*/}
              {/*        </svg>*/}
              {/*      </button>*/}
              {/*      <button*/}
              {/*          type="button"*/}
              {/*          className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"*/}
              {/*      >*/}
              {/*        <svg*/}
              {/*            className="w-5 h-5"*/}
              {/*            fill="currentColor"*/}
              {/*            viewBox="0 0 20 20"*/}
              {/*            xmlns="http://www.w3.org/2000/svg"*/}
              {/*        >*/}
              {/*          <path*/}
              {/*              fillRule="evenodd"*/}
              {/*              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"*/}
              {/*              clipRule="evenodd"*/}
              {/*          ></path>*/}
              {/*        </svg>*/}
              {/*      </button>*/}
              {/*      <button*/}
              {/*          type="button"*/}
              {/*          className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"*/}
              {/*      >*/}
              {/*        <svg*/}
              {/*            className="w-5 h-5"*/}
              {/*            fill="currentColor"*/}
              {/*            viewBox="0 0 20 20"*/}
              {/*            xmlns="http://www.w3.org/2000/svg"*/}
              {/*        >*/}
              {/*          <path*/}
              {/*              fillRule="evenodd"*/}
              {/*              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"*/}
              {/*              clipRule="evenodd"*/}
              {/*          ></path>*/}
              {/*        </svg>*/}
              {/*      </button>*/}
              {/*    </div>*/}
              {/*    <div className="flex flex-wrap items-center space-x-1 sm:pl-4">*/}
              {/*      <button*/}
              {/*          type="button"*/}
              {/*          className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"*/}
              {/*      >*/}
              {/*        <svg*/}
              {/*            className="w-5 h-5"*/}
              {/*            fill="currentColor"*/}
              {/*            viewBox="0 0 20 20"*/}
              {/*            xmlns="http://www.w3.org/2000/svg"*/}
              {/*        >*/}
              {/*          <path*/}
              {/*              fillRule="evenodd"*/}
              {/*              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"*/}
              {/*              clipRule="evenodd"*/}
              {/*          ></path>*/}
              {/*        </svg>*/}
              {/*      </button>*/}
              {/*      <button*/}
              {/*          type="button"*/}
              {/*          className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"*/}
              {/*      >*/}
              {/*        <svg*/}
              {/*            className="w-5 h-5"*/}
              {/*            fill="currentColor"*/}
              {/*            viewBox="0 0 20 20"*/}
              {/*            xmlns="http://www.w3.org/2000/svg"*/}
              {/*        >*/}
              {/*          <path*/}
              {/*              fillRule="evenodd"*/}
              {/*              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"*/}
              {/*              clipRule="evenodd"*/}
              {/*          ></path>*/}
              {/*        </svg>*/}
              {/*      </button>*/}
              {/*      <button*/}
              {/*          type="button"*/}
              {/*          className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"*/}
              {/*      >*/}
              {/*        <svg*/}
              {/*            className="w-5 h-5"*/}
              {/*            fill="currentColor"*/}
              {/*            viewBox="0 0 20 20"*/}
              {/*            xmlns="http://www.w3.org/2000/svg"*/}
              {/*        >*/}
              {/*          <path*/}
              {/*              fillRule="evenodd"*/}
              {/*              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"*/}
              {/*              clipRule="evenodd"*/}
              {/*          ></path>*/}
              {/*        </svg>*/}
              {/*      </button>*/}
              {/*      <button*/}
              {/*          type="button"*/}
              {/*          className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"*/}
              {/*      >*/}
              {/*        <svg*/}
              {/*            className="w-5 h-5"*/}
              {/*            fill="currentColor"*/}
              {/*            viewBox="0 0 20 20"*/}
              {/*            xmlns="http://www.w3.org/2000/svg"*/}
              {/*        >*/}
              {/*          <path*/}
              {/*              fillRule="evenodd"*/}
              {/*              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"*/}
              {/*              clipRule="evenodd"*/}
              {/*          ></path>*/}
              {/*        </svg>*/}
              {/*      </button>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <button*/}
              {/*      type="button"*/}
              {/*      data-tooltip-target="tooltip-fullscreen"*/}
              {/*      className="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"*/}
              {/*  >*/}
              {/*    <svg*/}
              {/*        className="w-5 h-5"*/}
              {/*        fill="currentColor"*/}
              {/*        viewBox="0 0 20 20"*/}
              {/*        xmlns="http://www.w3.org/2000/svg"*/}
              {/*    >*/}
              {/*      <path*/}
              {/*          fillRule="evenodd"*/}
              {/*          d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"*/}
              {/*          clipRule="evenodd"*/}
              {/*      ></path>*/}
              {/*    </svg>*/}
              {/*  </button>*/}
              {/*  <div*/}
              {/*      id="tooltip-fullscreen"*/}
              {/*      role="tooltip"*/}
              {/*      className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"*/}
              {/*  >*/}
              {/*    Show full screen*/}
              {/*    <div className="tooltip-arrow" data-popper-arrow></div>*/}
              {/*  </div>*/}
              {/*</div>*/}
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
