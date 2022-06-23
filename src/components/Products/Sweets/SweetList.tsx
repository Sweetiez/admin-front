import React, { useCallback, useState } from 'react';
import Page from '../../Page/Page';
import CreateSweet from './CreateSweet';
import { useSweets } from '../../../hooks/sweets/sweetsHooks';
import { useTranslation } from 'react-i18next';
import AccessRoleController from '../../Auth/AccessRoleController';
import { Role } from '../../../hooks/auth/access/Roles';
import Modal from '../../utils/Modal';
import CreateIngredient from './CreateIngredient';
import ProductTableRow from '../ProductTableRow';

const SweetList: React.FC = () => {
  const { t } = useTranslation();
  const [addModalState, setAddModalState] = useState(false);
  const [addIngredientModalState, setAddIngredientModalState] = useState(false);
  let { data: sweets } = useSweets();

  const manageCloseIngredientModal = useCallback(() => {
    setAddIngredientModalState(false);
  }, []);

  const manageCloseCreateProductModal = useCallback(() => {
    setAddModalState(false);
  }, []);

  if (sweets === undefined) {
    sweets = [];
  }

  return (
    <Page>
      <>
        <AccessRoleController redirect="/" role={Role.ADMIN} />
        <div className="flex justify-center">
          <button
            onClick={() => setAddModalState(true)}
            className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
          >
            {t('products.add_btn')}
          </button>
          <button
            onClick={() => setAddIngredientModalState(true)}
            className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
          >
            {t('ingredients.add_btn')}
          </button>
        </div>
      </>
      <div className="pt-4 grid grid-cols-8 grid-flow-col gap-4">
        <div className="col-start-1 col-end-2"></div>
        <div className="col-start-2 col-end-5">
          <div>{t('products.title_all')}</div>
        </div>
        <div className="row-start-3 2xl:row-start-1 col-start-2 2xl:col-start-5 col-end-5 2xl:col-end-8">
          <div>{t('products.title_online')}</div>
        </div>
        <table className="2xl:row-start-2 col-start-2 2xl:col-start-2 col-end-8 2xl:col-end-5 h-40">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">
                {t('products.col_name.product')}
              </th>
              <th className="py-3 px-6 text-left">
                {t('products.col_name.price')}
              </th>
              <th className="py-3 px-6 text-center">
                {t('products.col_name.highlight')}
              </th>
              <th className="py-3 px-6 text-center">
                {t('products.col_name.status')}
              </th>
              <th className="py-3 px-6 text-center">
                {t('products.col_name.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sweets
              .filter((product) => product.status !== 'PUBLISHED')
              .map((product, index) => (
                <ProductTableRow key={index} _id={index} product={product} />
              ))}
          </tbody>
        </table>
        <table className="row-start-4 2xl:row-start-2 col-start-2 2xl:col-start-5 col-end-8 2xl:col-end-8 h-40">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">
                {t('products.col_name.product')}
              </th>
              <th className="py-3 px-6 text-left">
                {t('products.col_name.price')}
              </th>
              <th className="py-3 px-6 text-center">
                {t('products.col_name.highlight')}
              </th>
              <th className="py-3 px-6 text-center">
                {t('products.col_name.status')}
              </th>
              <th className="py-3 px-6 text-center">
                {t('products.col_name.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sweets
              .filter((product) => product.status === 'PUBLISHED')
              .map((product, index) => (
                <ProductTableRow key={index} _id={index} product={product} />
              ))}
          </tbody>
        </table>
      </div>

      <Modal
        modalContent={
          <CreateIngredient setOpenedModal={setAddIngredientModalState} />
        }
        modalState={addIngredientModalState}
        setModalState={manageCloseIngredientModal}
      />
      <Modal
        modalContent={<CreateSweet setOpenedModal={setAddModalState} />}
        modalState={addModalState}
        setModalState={manageCloseCreateProductModal}
      />
    </Page>
  );
};

export default SweetList;
