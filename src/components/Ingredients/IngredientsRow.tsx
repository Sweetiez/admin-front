import React, {useCallback, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import IngredientModel from './models/IngredientModel';
import { deleteIngredient } from '../../hooks/ingredients/ingredientsHooks';
import Modal from '../utils/Modal';
import ValidateDelete from './ValidateDelete';

interface IngredientRowProps {
  ingredient: IngredientModel;
}

const IngredientRow: React.FC<IngredientRowProps> = ({ ingredient }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();
    const [deleteModalState, setDeleteModalState] =
        useState(false);
    const deleteModalCloseClick = useCallback(() => {
        setDeleteModalState(false);
    }, []);

  const removeIngredient = async (id: string) => {
    try {
      await deleteIngredient(id);
      addToast(`${t('ingredients.delete.alert_success')}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      await queryClient.invalidateQueries(`all-ingredients`);
      setDeleteModalState(false);
    } catch (e) {
      addToast(`${t('ingredients.delete.alert_error')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      <div className="flex justify-between my-8 bg-white shadow">
        <span className="p-4">{ingredient.name}</span>
        <span
          className="p-4"
          onClick={() => {
            setDeleteModalState(true)
          }}
        >
          <svg
            className="mt-0.5 ml-0.5 w-6 h-6 text-red-500"
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
        </span>
      </div>
      <Modal modalContent={<ValidateDelete manageClick={() => removeIngredient(ingredient.id ? ingredient.id : "")} manageClickClose={deleteModalCloseClick} />} modalState={deleteModalState} setModalState={deleteModalCloseClick} />
    </>
  );
};

export default IngredientRow;
