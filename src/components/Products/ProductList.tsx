import React, { Fragment, useState } from 'react';
import Page from '../Page/Page';
import ProductModel from './ProductModel';
import CreateProduct from './CreateProduct';
import { Transition, Dialog } from '@headlessui/react';
import { useSweets } from '../../hooks/sweets/sweetsHooks';

const ProductList: React.FC = () => {
  const [modalState, setModalState] = useState(false);
  let { data: sweets } = useSweets();

  if (sweets === undefined) {
    sweets = [];
  }

  return (
    <Page>
      <div className="pt-4 grid grid-cols-8 grid-flow-col gap-4">
        <div className="col-start-2 col-end-5">
          <button
            onClick={() => setModalState(true)}
            className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
          >
            Add product
          </button>
        </div>
        <table className="row-start-2 col-start-2 col-end-5">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-center">Priority</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sweets.map((product, index) => (
              <ProductTableRow key={index} _id={index} product={product} />
            ))}
          </tbody>
        </table>
        <table className="row-start-2 col-start-5 col-end-8">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-center">Priority</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {sweets.map((product, index) => (
              <ProductTableRow key={index} _id={index} product={product} />
            ))}
          </tbody>
        </table>
      </div>
      <Transition.Root show={modalState} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setModalState}
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
                <CreateProduct setOpenedModal={setModalState} />
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
  product: ProductModel;
}
const ProductTableRow: React.FC<ProductRowProps> = ({ _id, product }) => {
  const lineColor = `border-b border-gray-200 ${
    _id % 2 === 0 ? 'dark:bg-gray-100' : 'dark:bg-gray-300 bg-gray-50'
  } hover:bg-gray-100`;

  return (
    <>
      <tr className={lineColor}>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            {/*<div className="mr-2">*/}
            {/*  <img*/}
            {/*    className="w-6 h-6"*/}
            {/*    src="https://img.icons8.com/color/48/000000/php.png"*/}
            {/*    alt="img1"*/}
            {/*  />*/}
            {/*</div>*/}
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
          <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
            {product.status}
          </span>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center">
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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
    </>
  );
};

export default ProductList;
