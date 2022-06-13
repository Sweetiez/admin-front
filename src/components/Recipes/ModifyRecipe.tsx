import React, { useState } from 'react';
import RecipeModel from './models/RecipeModel';
import { useTranslation } from 'react-i18next';
import { arrayMove, List } from 'react-movable';
import StepCard from './StepCard';
import StepModel from './models/StepModel';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  deleteRecipeImage,
  updateRecipe,
  updateRecipeStep,
  uploadRecipeImage,
  useRecipeDetail,
} from '../../hooks/recipes/recipesHooks';
import Page from '../Page/Page';
import UpdateRecipeStepsRequest from '../../hooks/recipes/requests/UpdateRecipeStepsRequest';
import { useMutation, useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import DeleteImageRequest from '../../hooks/sweets/requests/DeleteImageRequest';
import { capitalizeFirstLetter } from '../../hooks/utils/strings';
import ProductModelRow from '../Products/models/ProductModelRow';
import UpdateRecipeRequest from '../../hooks/recipes/requests/UpdateRecipeRequest';
import Modal from '../utils/Modal';
import AddRecipeStepModal from '../Products/AddRecipeStepModal';

const ModifyRecipe: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();
  let { id } = useParams();
  const { data: recipe } = useRecipeDetail(id ? id : '');
  const { addToast } = useToasts();
  const [addStepModal, setAddStepModal] = useState(false);

  const [items, setItems] = useState(
    computeStepCards(recipe ? recipe : new RecipeModel()),
  );

  const { mutate } = useMutation(updateRecipe, {
    onSuccess: async (data: ProductModelRow) => {
      addToast(`${t('recipes.create.alert.success')}: ${data.name}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      await queryClient.invalidateQueries('all-recipes');
      await queryClient.invalidateQueries(
        `recipe-${recipe?.id ? recipe.id : ''}`,
      );
    },
    onError: (err: any) => {
      addToast(err.message, { appearance: 'error', autoDismiss: true });
    },
  });

  async function submitRecipeModification(event: any) {
    const request = new UpdateRecipeRequest(
      id ? id : '',
      capitalizeFirstLetter(event.target.name.value),
      capitalizeFirstLetter(event.target.description.value),
      event.target.difficulty.value,
      Number(event.target.cost.value),
      Number(event.target.people.value),
      Number(event.target.preparationTime.value),
      Number(event.target.chillTime.value),
      Number(event.target.cookTime.value),
    );

    mutate(request);
    navigate(`/admin/recipes`);
  }

  async function handleModifyRecipeSteps() {
    const stepsUpdated = computeSteps();
    const recipeId = recipe?.id ? recipe.id : '';
    const updateStepOrderRequest = new UpdateRecipeStepsRequest(
      recipeId,
      stepsUpdated,
    );
    const response = await updateRecipeStep(updateStepOrderRequest);
    await queryClient.invalidateQueries(`recipe-${recipeId}`);

    console.log(response);
    // setItems(computeStepCards(response));
  }

  function computeSteps(): StepModel[] {
    return items.map(
      (item, index) =>
        new StepModel(
          item.props.step.id,
          index + 1,
          item.props.step.description,
        ),
    );
  }

  function computeStepCards(recipe: RecipeModel) {
    return recipe?.steps
      ? recipe.steps.map((step) => <StepCard recipe={recipe} step={step} />)
      : [];
  }

  async function onSubmitUploadFile(event: any) {
    event.preventDefault();

    if (!recipe) {
      return null;
    }

    await uploadRecipeImage(recipe.id ? recipe.id : '', event.target.files[0]);

    await queryClient.invalidateQueries(`recipe-${recipe.id}`);
    addToast(`${t('products.update.alert_img_upload')}`, {
      appearance: 'success',
      autoDismiss: true,
    });
  }

  async function onDeleteImage(id: string, url: string) {
    const request = new DeleteImageRequest(url);
    const response = await deleteRecipeImage(id, request);
    if (response) {
      await queryClient.invalidateQueries(`all-recipes`);
      await queryClient.invalidateQueries(`recipe-${id}`);
      addToast(`${t('products.update.alert_img_delete')}`, {
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
    <Page>
      <div className="flex justify-between">
        <div className="w-4/6">
          <form onSubmit={submitRecipeModification}>
            <div className="flex justify-between">
              <Link
                className="m-3 py-2 px-4 shadow-md no-underline rounded-full bg-gray-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
                to="/admin/recipes"
              >
                {t('recipes.button.back')}
              </Link>
              <div className="flex">
                <h1 className="m-3 text-gray-600 font-bold md:text-2xl text-xl">
                  {t('recipes.edit.title')}
                </h1>
              </div>
              <div></div>
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
                defaultValue={recipe?.title}
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
                  defaultValue={recipe?.people}
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
                  defaultValue={recipe?.cost}
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
                  defaultValue={recipe?.difficulty}
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
                  defaultValue={recipe?.preparationTime}
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
                  defaultValue={recipe?.chillTime}
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
                  defaultValue={recipe?.cookTime}
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
                    defaultValue={recipe?.description}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-5 mx-7">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
                {t('products.update.img_upload_title')}
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
                      {t('products.update.img_upload_description')}
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
                {recipe?.images?.map((image) => {
                  let component;
                  if (image !== '') {
                    component = (
                      <div className="mr-3 w-16 h-16">
                        <button
                          type="button"
                          onClick={() =>
                            onDeleteImage(recipe?.id ? recipe?.id : '', image)
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
                    component = <></>;
                  }
                  return component;
                })}
              </div>
            </div>
            <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
              <input
                type="submit"
                value={t('recipes.button.edit')}
                className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
              />
            </div>
          </form>
        </div>
        <div className="w-2/6">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between">
              <button
                onClick={() => setAddStepModal(true)}
                className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
              >
                {t('recipes.edit.step.add')}
              </button>
              <button
                onClick={handleModifyRecipeSteps}
                className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
              >
                {t('recipes.edit.step.update')}
              </button>
              <div></div>
            </div>
            <div className="w-auto">
              <List
                values={items}
                onChange={({ oldIndex, newIndex }) => {
                  setItems(arrayMove(items, oldIndex, newIndex));
                }}
                renderList={({ children, props, isDragged }) => (
                  <ul
                    {...props}
                    style={{
                      padding: '1em',
                      cursor: isDragged ? 'grabbing' : undefined,
                      height: 700,
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                    }}
                  >
                    {children}
                  </ul>
                )}
                renderItem={({ value, props, isDragged, isSelected }) => (
                  <li
                    {...props}
                    style={{
                      ...props.style,
                      cursor: isDragged ? 'grabbing' : 'grab',
                      backgroundColor:
                        isDragged || isSelected ? '#EEE' : '#FFF',
                      padding: '2px',
                    }}
                  >
                    {value}
                  </li>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        modalContent={
          <AddRecipeStepModal
            recipe={recipe ? recipe : new RecipeModel()}
            setOpenedModal={setAddStepModal}
          />
        }
        modalState={addStepModal}
        setModalState={() => setAddStepModal(false)}
      />
    </Page>
  );
};

export default ModifyRecipe;
