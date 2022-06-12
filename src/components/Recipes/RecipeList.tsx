import React, { useState } from 'react';
import Page from '../Page/Page';
import AccessRoleController from '../Auth/AccessRoleController';
import { Role } from '../../hooks/auth/access/Roles';
import { useTranslation } from 'react-i18next';
import CreateRecipe from './CreateRecipe';
import { useRecipes } from '../../hooks/recipes/recipesHooks';
import RecipeModel from './models/RecipeModel';
import Modal from '../utils/Modal';

const RecipeList: React.FC = () => {
  const { t } = useTranslation();
  const [addModalState, setAddModalState] = useState(false);
  let { data: recipes } = useRecipes();

  if (recipes === undefined) {
    recipes = [];
  }

  return (
    <Page>
      <>
        <AccessRoleController redirect="/" role={Role.ADMIN} />
        <button
          onClick={() => setAddModalState(true)}
          className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
        >
          {t('recipes.button.add')}
        </button>
      </>
      <AccessRoleController redirect="/" role={Role.ADMIN} />
      <div className="pt-4 grid grid-cols-8 grid-flow-col gap-4">
        <div className="col-start-2 col-end-5">
          <table className="row-start-2 col-start-2 col-end-5">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Recette</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {recipes?.map((recipe, index) => (
                <RecipeTableRow recipe={recipe} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        modalContent={<CreateRecipe setOpenedModal={setAddModalState} />}
        modalState={addModalState}
        setModalState={() => setAddModalState(false)}
      />
    </Page>
  );
};

interface RecipeTableRowProps {
  recipe: RecipeModel;
}

const RecipeTableRow: React.FC<RecipeTableRowProps> = ({ recipe }) => {
  return (
    <tr className="">
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <span className="font-medium">{recipe.title}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center">
          {/*<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">*/}
          {/*  <svg*/}
          {/*    xmlns="http://www.w3.org/2000/svg"*/}
          {/*    fill="none"*/}
          {/*    viewBox="0 0 24 24"*/}
          {/*    stroke="currentColor"*/}
          {/*  >*/}
          {/*    <path*/}
          {/*      strokeLinecap="round"*/}
          {/*      strokeLinejoin="round"*/}
          {/*      strokeWidth="2"*/}
          {/*      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"*/}
          {/*    />*/}
          {/*    <path*/}
          {/*      strokeLinecap="round"*/}
          {/*      strokeLinejoin="round"*/}
          {/*      strokeWidth="2"*/}
          {/*      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"*/}
          {/*    />*/}
          {/*  </svg>*/}
          {/*</div>*/}
          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default RecipeList;
