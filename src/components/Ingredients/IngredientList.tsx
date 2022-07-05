import React from 'react';
import {useTranslation} from "react-i18next";
import {useIngredients} from "../../hooks/ingredients/ingredientsHooks";
import Page from "../Page/Page";
import IngredientsRow from "./IngredientsRow";

const IngredientList: React.FC = () => {
    const { t } = useTranslation();
    const { data: ingredientData } = useIngredients();

    return (
        <Page>
            <div className="px-20 py-8">
                <div className="font-dark font-bold pt-4 align font-birthstone text-5xl dark:text-white">
                    {t('ingredients.ingredientList')}
                </div>
                { ingredientData?.map((ingredient, index) => (
                    <IngredientsRow key={index} ingredient={ingredient}/>
                ))}
            </div>
        </Page>
    );
};

export default IngredientList;