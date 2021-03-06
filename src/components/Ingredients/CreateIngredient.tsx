import React, {useState} from 'react';
import { useToasts } from 'react-toast-notifications';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from '../../hooks/utils/strings';
import CreateIngredientRequest from '../../hooks/ingredients/requests/CreateIngredientRequest';
import { createIngredient } from '../../hooks/ingredients/ingredientsHooks';
import {useQueryClient} from "react-query";
import Lottie from "react-lottie-player";
import loader from "../../assets/lotties/loader.json";

interface CreateProductProps {
  setOpenedModal: (openedModal: boolean) => void;
}
const CreateIngredient: React.FC<CreateProductProps> = ({ setOpenedModal }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  const submitIngredientCreation = async (event: any) => {
    event.preventDefault();
    const name = capitalizeFirstLetter(event.target.name.value);

    if (name === '') {
      addToast(`${t('ingredients.alert_failed_empty')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    const request = new CreateIngredientRequest(name);

    try {
      setLoading(true);
      await createIngredient(request);
        addToast(`${t('ingredients.alert_success', {name: name})}`, {
            appearance: 'success',
            autoDismiss: true,
        });
      await queryClient.invalidateQueries(`all-ingredients`);
      setLoading(false);
      setOpenedModal(false);
    } catch (e) {
      addToast(`${t('ingredients.alert_api_error')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid bg-white rounded-lg shadow-xl w-fit dark:bg-gray-800">
        <div className="flex justify-center py-4">
          <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
        </div>

        <form onSubmit={submitIngredientCreation}>
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl dark:text-white">
                {t('ingredients.title')}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 my-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('products.name')}
            </label>
            <input
              id="name"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('products.name')}
            />
          </div>

          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button
              type="button"
              onClick={() => {
                setOpenedModal(false);
              }}
              className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              {t('products.cancel_btn')}
            </button>
            <button
                disabled={loading}
              type="submit"
              className={`${loading ? 'bg-gray-300 px-4' : 'bg-purple-500 hover:bg-purple-700 px-4 py-2'} w-auto rounded-lg shadow-xl font-medium text-white`}
            >
              {loading ?
                  <Lottie
                      className="h-10 w-14"
                      loop
                      animationData={loader}
                      play
                  />
                  : <>{t('products.save_btn')}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredient;
