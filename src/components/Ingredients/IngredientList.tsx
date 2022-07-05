import React, {useCallback, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useIngredients} from "../../hooks/ingredients/ingredientsHooks";
import Page from "../Page/Page";
import IngredientsRow from "./IngredientsRow";
import AccessRoleController from "../Auth/AccessRoleController";
import {Role} from "../../hooks/auth/access/Roles";
import Modal from "../utils/Modal";
import CreateIngredient from "./CreateIngredient";

const IngredientList: React.FC = () => {
    const { t } = useTranslation();
    const { data: ingredientData } = useIngredients();
    const [addIngredientModalState, setAddIngredientModalState] = useState(false);

    const manageCloseIngredientModal = useCallback(() => {
        setAddIngredientModalState(false);
    }, []);

    return (
        <Page>
            <div className="pt-4">
                <AccessRoleController redirect="/" role={Role.ADMIN} />
                <div className="flex justify-center">
                    <button
                        onClick={() => setAddIngredientModalState(true)}
                        className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
                    >
                        {t('ingredients.add_btn')}
                    </button>
                </div>
            </div>
            <div className="px-20 py-8">
                <div className="font-dark font-bold pt-4 align font-birthstone text-5xl dark:text-white">
                    {t('ingredients.ingredientList')}
                </div>
                { ingredientData?.map((ingredient, index) => (
                    <IngredientsRow key={index} ingredient={ingredient}/>
                ))}
            </div>
            <Modal
                modalContent={
                    <CreateIngredient setOpenedModal={setAddIngredientModalState} />
                }
                modalState={addIngredientModalState}
                setModalState={manageCloseIngredientModal}
            />
        </Page>
    );
};

export default IngredientList;