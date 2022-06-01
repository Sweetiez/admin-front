import React, { Fragment, useState } from 'react';
import Page from '../Page/Page';
import ProductModelRow from './models/ProductModelRow';
import CreateProduct from './CreateProduct';
import { Dialog, Transition } from '@headlessui/react';
import { useSweets } from '../../hooks/sweets/sweetsHooks';
import ModifyProduct from './ModifyProduct';
import PublishModal from './PublishModal';
import UnPublishModal from './UnPublishModal';
import { useTranslation } from 'react-i18next';
import AccessRoleController from '../Auth/AccessRoleController';
import { Role } from '../../hooks/auth/access/Roles';

const ProductList: React.FC = () => {
  const { t } = useTranslation();
  const [addModalState, setAddModalState] = useState(false);
  let { data: sweets } = useSweets();

  if (sweets === undefined) {
    sweets = [];
  }

  return (
    <Page>
      <>
        <AccessRoleController redirect="/" role={Role.ADMIN} />
        <button
          onClick={() => setAddModalState(true)}
          className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
        >
          {t('products.add_btn')}
        </button>
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

      <Transition.Root show={addModalState} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setAddModalState}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <CreateProduct setOpenedModal={setAddModalState} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </Page>
  );
};

interface ProductRowProps {
  _id: number;
  product: ProductModelRow;
}
const ProductTableRow: React.FC<ProductRowProps> = ({ _id, product }) => {
  const [modifyModalState, setModifyModalState] = useState(false);
  const [publishModalState, setPublishModalState] = useState(false);
  const [unPublishModalState, setUnPublishModalState] = useState(false);

  const lineColor = `border-b border-gray-200 ${
    _id % 2 === 0 ? 'dark:bg-gray-100' : 'dark:bg-gray-300 bg-gray-50'
  } hover:bg-gray-100`;

  let statusStyle: string;
  switch (product.status) {
    case 'PUBLISHED':
      statusStyle = 'bg-green-200 text-green-600';
      break;
    case 'CREATED':
      statusStyle = 'bg-indigo-200 text-indigo-600';
      break;
    case 'DELETED':
      statusStyle = 'bg-red-200 text-red-600';
      break;
    default:
      statusStyle = 'bg-brown-200 text-brown-600';
  }

  const isPublished = product.status === 'PUBLISHED';

  const publishSVG = (
    <svg
      fill="#FFF"
      height="18"
      viewBox="0 0 24 24"
      width="18"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </svg>
  );

  const unpublishedSVG = (
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="18px"
      height="18px"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
    >
      <polygon
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeMiterlimit="10"
        points="44,18 54,18 54,63 10,63 10,18 20,18 "
      />
      <line
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="39"
        y1="49"
        x2="25"
        y2="35"
      />
      <line
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="25"
        y1="49"
        x2="39"
        y2="35"
      />
      <path
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M22,24V11c0-5.523,4.477-10,10-10s10,4.477,10,10v13"
      />
    </svg>
  );

  return (
    <>
      <tr className={lineColor}>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span className="font-medium">{product.name}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span>{product.price} €</span>
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center">
            <span>{product.highlight}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <span className={`${statusStyle} py-1 px-3 rounded-full text-xs`}>
            {product.status}
          </span>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            <div
              onClick={() => setModifyModalState(true)}
              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
            >
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
            <div
              onClick={
                isPublished
                  ? () => setUnPublishModalState(true)
                  : () => setPublishModalState(true)
              }
              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
            >
              {isPublished ? unpublishedSVG : publishSVG}
            </div>
          </div>
        </td>
      </tr>
      <Transition.Root show={modifyModalState} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setModifyModalState}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <ModifyProduct
                  product={product}
                  setOpenedModal={setModifyModalState}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={publishModalState} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setPublishModalState}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <PublishModal
                  product={product}
                  setOpenedModal={setPublishModalState}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={unPublishModalState} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setUnPublishModalState}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <UnPublishModal
                  product={product}
                  setOpenedModal={setUnPublishModalState}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProductList;
