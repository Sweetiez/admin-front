import React from 'react';
import {useTranslation} from "react-i18next";

interface ValidateDeleteProps {
    manageClick: () => void;
    manageClickClose: () =>void;
}

const ValidateDelete: React.FC<ValidateDeleteProps> = ({manageClick, manageClickClose}) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="p-8">
                <div className="flex justify-center mb-4">
                    <span className="text-lg">{t('ingredients.delete.areYouSure')}</span>
                </div>
                <div className="flex justify-center">
                    <button className="rounded-lg bg-red-600 text-xs text-white p-2 shadow w-16" onClick={manageClickClose}>
                        {t('reports.cancel')}
                    </button>
                    <button className="rounded-lg bg-green-600 text-xs text-white p-2 shadow ml-2 w-16" onClick={manageClick}>
                        {t('reports.yes')}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ValidateDelete;
