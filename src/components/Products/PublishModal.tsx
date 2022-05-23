import React from 'react';
import ProductModelRow from './ProductModelRow';
import PublishSweetRequest from '../../hooks/sweets/requests/PublishSweetRequest';
import { publishSweet, useSweetById } from '../../hooks/sweets/sweetsHooks';
import { useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import Lottie from 'react-lottie-player';
import animationJson from '../../assets/lotties/walking-celery.json';
import { useTranslation } from 'react-i18next';

interface PublishModalProps {
  product: ProductModelRow;
  setOpenedModal: (openedModal: boolean) => void;
}

const PublishModal: React.FC<PublishModalProps> = ({
  product,
  setOpenedModal,
}) => {
  const { t } = useTranslation();
  const { data: sweetData } = useSweetById(product.id ? product.id : '');
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  async function handlePublishSweet(
    id: string,
    highlight: string,
    images: string[],
  ) {
    if (images.length <= 0 || images[0] === '') {
      addToast(t('products.publish.alert_fail_images'), {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    const publishRequest = new PublishSweetRequest(id, highlight);
    const result = await publishSweet(publishRequest);
    // refresh sweets
    await queryClient.invalidateQueries('all-sweets');
    addToast(`${t('products.publish.alert_success')}: ${result.name.value}`, {
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
            <Lottie
              className="h-fit w-fit"
              loop
              animationData={animationJson}
              play
            />
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                {t('products.publish.title')}
              </h3>
              <div className="mt-2">
                {/*<p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>*/}
                <p className="text-sm text-gray-500">
                  {t('products.publish.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={() =>
              handlePublishSweet(
                product?.id ? product?.id : '',
                product?.highlight ? product?.highlight : '',
                sweetData?.images ? sweetData?.images : [],
              )
            }
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {t('products.publish.publish_btn')}
          </button>
          <button
            onClick={() => {
              setOpenedModal(false);
            }}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {t('products.publish.cancel_btn')}
          </button>
        </div>
      </div>
    </>
  );
};

export default PublishModal;
