import ProductModelRow from '../models/ProductModelRow';
import React, { useState } from 'react';
import { updateSweet, useSweetById } from '../../../hooks/sweets/sweetsHooks';
import { useToasts } from 'react-toast-notifications';
import { useQueryClient } from 'react-query';
import UpdateSweetRequest from '../../../hooks/sweets/requests/UpdateSweetRequest';
import { useTranslation } from 'react-i18next';
import DeleteImageRequest from '../../../hooks/sweets/requests/DeleteImageRequest';
import Select from 'react-dropdown-select';
import {
  createIngredient,
  useIngredients,
} from '../../../hooks/ingredients/ingredientsHooks';
import { capitalizeFirstLetter } from '../../../hooks/utils/strings';
import CreateIngredientRequest from '../../../hooks/ingredients/requests/CreateIngredientRequest';
import {
  deleteProductImage,
  uploadProductImage,
} from '../../../hooks/products/productsHooks';

interface ModifyProductProps {
  product: ProductModelRow;
  setOpenedModal: (openedModal: boolean) => void;
}

const ModifySweet: React.FC<ModifyProductProps> = ({
  product,
  setOpenedModal,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    isLoading: isSweetLoading,
    isError: isSweetError,
    data: sweetData,
    error,
  } = useSweetById(product.id ? product.id : '');
  const { data: ingredientData } = useIngredients();
  const initQuantity = sweetData && sweetData.unitPerPackage;
  const [quantity, setQuantity] = useState(initQuantity);
  const { addToast } = useToasts();
  const [createNewIngredient, setCreateNewIngredient] = useState(false);
  const [newIngredientName, setNewIngredientName] = useState('');

  const ingredientOptions = ingredientData
    ? ingredientData.map((ingredient) => ({
        value: ingredient.id ? ingredient.id : '0',
        label: ingredient.name ? ingredient.name : '',
      }))
    : [];

  const sweetIngredientsData = sweetData?.ingredients
    ? sweetData?.ingredients.map((sweetIngredientData) => ({
        value: sweetIngredientData.id ? sweetIngredientData.id : '0',
        label: sweetIngredientData.name ? sweetIngredientData.name : '',
      }))
    : [];
  const [sweetIngredients, setSweetIngredient] =
    useState<any>(sweetIngredientsData);

  if (isSweetLoading) return <div>Loading...</div>;
  if (isSweetError) {
    addToast(error.message, { appearance: 'error', autoDismiss: true });
    return <div>Error...</div>;
  }

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
      await createIngredient(request);
      addToast(`${t('ingredients.alert_success', { name: name })}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      await queryClient.invalidateQueries('all-ingredients');
      setCreateNewIngredient(false);
    } catch (e) {
      addToast(`${t('ingredients.alert_api_error')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  async function onSubmitUploadFile(event: any) {
    event.preventDefault();

    if (!sweetData) {
      return null;
    }

    await uploadProductImage(
      sweetData.id ? sweetData.id : '',
      event.target.files[0],
      'sweets',
    );

    await queryClient.invalidateQueries(`sweet-${sweetData.id}`);
    addToast(`${t('products.alert_img_upload')}`, {
      appearance: 'success',
      autoDismiss: true,
    });
  }

  async function handleModifySweet(event: any) {
    event.preventDefault();

    if (!sweetData) {
      return null;
    }

    let ingredients: string[] = [];
    sweetIngredients.map((ingredient: any) =>
      ingredients.push(ingredient.value),
    );

    let defaultIngredients: string[] = [];
    sweetIngredientsData.map((defaultIngredient: any) =>
      defaultIngredients.push(defaultIngredient.value),
    );

    const request = new UpdateSweetRequest(
      sweetData.id ? sweetData.id : '',
      event.target.name.value,
      event.target.price.value,
      quantity ? quantity : sweetData.unitPerPackage,
      event.target.description.value,
      sweetData.images ? sweetData.images : [],
      ingredients.length > 0 ? ingredients : defaultIngredients,
      event.target.highlight.value,
      sweetData.state ? sweetData.state : '',
      event.target.flavor.value,
      sweetData.rating ? sweetData.rating : 0,
    );

    const response = await updateSweet(request);
    if (response) {
      await queryClient.invalidateQueries(`all-sweets`);
      await queryClient.invalidateQueries(`sweet-${sweetData.id}`);
      addToast(`${t('products.sweets.update.alert_success')}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      setOpenedModal(false);
    } else {
      addToast(`${t('products.sweets.update.alert_failed')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }

  async function onDeleteImage(id: string, url: string) {
    const request = new DeleteImageRequest(url);
    const response = await deleteProductImage(id, request, 'sweets');
    console.log('onDeleteImage', response)
    if (response) {
      await queryClient.invalidateQueries(`all-sweets`);
      await queryClient.invalidateQueries(`sweet-${id}`);
      addToast(`${t('products.alert_img_delete')}`, {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      addToast(`${t('products.update.alert_failed')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="grid bg-white rounded-lg shadow-xl w-fit">
        <form onSubmit={handleModifySweet}>
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="pt-5 text-gray-600 font-bold md:text-2xl text-xl">
                {t('products.sweets.update.title')}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              {t('products.name')}
            </label>
            <input
              id="name"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('products.name')}
              defaultValue={sweetData?.name}
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              {t('products.ingredients')}
            </label>
            {ingredientOptions && (
              <Select
                multi
                values={sweetIngredientsData}
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
                  className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
                  onClick={() => submitIngredientCreation()}
                >
                  {t('ingredients.add_btn')}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                {t('products.price')}
              </label>
              <input
                id="price"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                placeholder={t('products.price')}
                defaultValue={sweetData?.price}
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                {t('products.quantity')}
              </label>
              <input
                id="unitPerPackage"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="number"
                defaultValue={sweetData && sweetData.unitPerPackage}
                onChange={(value) => handelQuantity(Number(value.target.value))}
                placeholder={t('products.quantity')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              {t('products.flavor')}
            </label>
            <select
              id="flavor"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              defaultValue={sweetData?.flavor}
            >
              <option>SALTY</option>
              <option>SWEET</option>
              <option>MIXED</option>
            </select>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              {t('products.highlight')}
            </label>
            <select
              id="highlight"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              defaultValue={sweetData?.highlight}
            >
              <option>COMMON</option>
              <option>PROMOTED</option>
              <option>BANNER</option>
            </select>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              {t('products.description')}
            </label>
            <input
              id="description"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('products.description')}
              defaultValue={sweetData?.description}
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
              {t('products.img_upload_title')}
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                    {t('products.img_upload_description')}
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={onSubmitUploadFile}
                />
              </label>
            </div>
            <div className="flex pt-3">
              {sweetData?.images?.map((image, index) => {
                let component;
                if (image !== '') {
                  component = (
                    <div className="mr-3 w-16 h-16" key={index}>
                      <button
                        type="button"
                        onClick={() =>
                          onDeleteImage(
                            sweetData?.id ? sweetData?.id : '',
                            image,
                          )
                        }
                        className="absolute w-5 h-5 bg-red-500"
                      >
                        <svg
                          className="mt-0.5 ml-0.5 w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                      <img src={image} alt="thumbnail" />
                    </div>
                  );
                } else {
                  component = <span key={index}></span>;
                }
                return component;
              })}
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
              {t('products.cancel_btn')}
            </button>
            <input
              type="submit"
              value={t('products.modify_btn')}
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifySweet;
