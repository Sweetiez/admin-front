import React, { useState } from 'react';
import CreateSweetRequest from '../../../hooks/sweets/requests/CreateSweetRequest';
import { useMutation } from 'react-query';
import { createSweet } from '../../../hooks/sweets/sweetsHooks';
import { useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from '../../../hooks/utils/strings';
import {
  createIngredient,
  useIngredients,
} from '../../../hooks/ingredients/ingredientsHooks';
import Select from 'react-dropdown-select';
import '../../../assets/css/_dropdown-select.css';
import CreateIngredientRequest from '../../../hooks/ingredients/requests/CreateIngredientRequest';
import Lottie from 'react-lottie-player';
import loader from '../../../assets/lotties/loader.json';

interface CreateProductProps {
  setOpenedModal: (openedModal: boolean) => void;
}
const CreateSweet: React.FC<CreateProductProps> = ({ setOpenedModal }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: ingredientData } = useIngredients();
  const { addToast } = useToasts();
  const [createNewIngredient, setCreateNewIngredient] = useState(false);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [quantity, setQuantity] = useState(5);
  const [sweetIngredients, setSweetIngredient] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [loadingIngredient, setLoadingIngredient] = useState(false);

  const ingredientOptions = ingredientData
    ? ingredientData.map((ingredient: any) => ({
        value: ingredient.id ? ingredient.id : '0',
        label: ingredient.name ? ingredient.name : '',
      }))
    : [];

  const { mutate } = useMutation(createSweet, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('all-sweets');
      addToast(`${t('products.sweets.add.alert_success')}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      setLoading(false);
      setOpenedModal(false);
    },
    onError: (err: any) => {
      addToast(err.message, { appearance: 'error', autoDismiss: true });
      setLoading(false);
    },
  });

  const handelQuantity = (value: number) => {
    if (value < 1) value = 1;
    setQuantity(value);
  };

  const submitIngredientCreation = async () => {
    const name = capitalizeFirstLetter(newIngredientName);

    if (name === '') {
      addToast(`${t('ingredients.alert_failed_empty')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    const request = new CreateIngredientRequest(name);

    try {
      setLoadingIngredient(true);
      await createIngredient(request);
      addToast(`${t('ingredients.alert_success', { name: name })}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      await queryClient.invalidateQueries('all-ingredients');
      setLoadingIngredient(false);
      setCreateNewIngredient(false);
    } catch (e) {
      addToast(`${t('ingredients.alert_api_error')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      setLoadingIngredient(false);
    }
  };

  const submitSweetCreation = async (event: any) => {
    event.preventDefault();
    const name = capitalizeFirstLetter(event.target.name.value);
    const price = event.target.price.value;
    const flavor = event.target.flavor.value;
    const description = capitalizeFirstLetter(event.target.description.value);

    if (
      name === '' ||
      price === '' ||
      flavor === '' ||
      description === '' ||
      sweetIngredients.length < 1
    ) {
      addToast(`${t('products.sweets.add.alert_failed_empty')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    let ingredients: string[] = [];
    sweetIngredients.map((ingredient: any) =>
      ingredients.push(ingredient.value),
    );

    const request = new CreateSweetRequest(
      name,
      Number(price),
      quantity,
      ingredients,
      description,
      flavor,
    );

    setLoading(true);
    mutate(request);
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

        <form onSubmit={submitSweetCreation}>
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl dark:text-white">
                {t('products.sweets.add.title')}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
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

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('products.ingredients')}
            </label>
            {ingredientOptions && (
              <Select
                multi
                values={[]}
                options={ingredientOptions}
                color={'#8b5cf6'}
                onChange={(values) => setSweetIngredient(values)}
                name="select"
                dropdownHeight={'150px'}
              />
            )}
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            {createNewIngredient ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                <input
                  name="ingredientName"
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  placeholder={t('products.name')}
                  onChange={(value) => setNewIngredientName(value.target.value)}
                />

                <button
                  type="button"
                  disabled={loadingIngredient}
                  className={`${
                      loadingIngredient
                      ? 'bg-gray-300 px-4'
                      : 'bg-purple-500 hover:bg-purple-700 px-4 py-2'
                  } w-auto rounded-lg shadow-xl font-medium text-white`}
                  onClick={() => submitIngredientCreation()}
                >
                  {loadingIngredient ? (
                      <div className="flex justify-center">
                        <Lottie
                            className="h-10 w-14"
                            loop
                            animationData={loader}
                            play
                        />
                      </div>
                  ) : (
                    <>{t('products.add')}</>
                  )}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setCreateNewIngredient(true);
                }}
                className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
              >
                {t('ingredients.add_btn')}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('products.flavor')}
            </label>
            <select
              id="flavor"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="SALTY">{t('products.flavors.SALTY')}</option>
              <option value="SWEET">{t('products.flavors.SWEET')}</option>
              <option value="MIXED">{t('products.flavors.MIXED')}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
                {t('products.price')}
              </label>
              <input
                id="price"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                placeholder={t('products.price')}
              />
            </div>

            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
                {t('products.quantity')}
              </label>
              <input
                id="unitPerPackage"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="number"
                value={quantity}
                onChange={(value) => handelQuantity(Number(value.target.value))}
                placeholder={t('products.quantity')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('products.description')}
            </label>
            <input
              id="description"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('products.description')}
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
              className={`${
                loading
                  ? 'bg-gray-300 px-4'
                  : 'bg-purple-500 hover:bg-purple-700 px-4 py-2'
              } w-auto rounded-lg shadow-xl font-medium text-white`}
            >
              {loading ? (
                  <Lottie
                      className="h-10 w-14"
                      loop
                      animationData={loader}
                      play
                  />
              ) : (
                  <>{t('products.save_btn')}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSweet;
