import React from 'react';
import ProductModelRow from '../models/ProductModelRow';
import UnPublishSweetRequest from '../../../hooks/sweets/requests/UnPublishSweetRequest';
import { unPublishSweet } from '../../../hooks/sweets/sweetsHooks';
import { useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { useTranslation } from 'react-i18next';

interface UnPublishModalProps {
  product: ProductModelRow;
  setOpenedModal: (openedModal: boolean) => void;
}

const UnPublishSweetModal: React.FC<UnPublishModalProps> = ({
  product,
  setOpenedModal,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  console.log('SWEET');

  async function handleUnPublishSweet(productId: string) {
    const request = new UnPublishSweetRequest(productId);
    await unPublishSweet(request);
    await queryClient.invalidateQueries('all-sweets');
    addToast(`${t('products.unpublish.alert_success')}`, {
      appearance: 'info',
      autoDismiss: true,
    });
    setOpenedModal(false);
  }

  return (
    <>
      <div className="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                {t('products.unpublish.title')}
              </h3>
              <div className="mt-2">
                {/*<p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>*/}
                <p className="text-sm text-gray-500">
                  {t('products.unpublish.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={() => handleUnPublishSweet(product?.id ? product?.id : '')}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {t('products.unpublish_btn')}
          </button>
          <button
            onClick={() => {
              setOpenedModal(false);
            }}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {t('products.cancel_btn')}
          </button>
        </div>
      </div>
    </>
  );
};

export default UnPublishSweetModal;
