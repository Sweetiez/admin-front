import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OrderedProductModel from './models/OrderedProductModel';
import OrderModel from './models/OrderModel';
import OrderStatus from './OrderStatus';
import { Dialog, Transition } from '@headlessui/react';
import OrderChangeStatusModal from './OrderChangeStatusModal';

interface OrderCardProps {
  order: OrderModel;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { t } = useTranslation();
  const [updateStatusModal, setUpdateStatusModal] = useState(false);

  function formatDate(date: string) {
    const [year, month, day] = date.split('-');
    [day, month, year].join('/');
    return (
      <span className="font-semibold ml-1 dark:text-white">
        {[day, month, year].join('/')}
      </span>
    );
  }

  return (
    <>
      <button onClick={() => setUpdateStatusModal(true)}>
        <div className="mx-auto p-6 bg-white border my-2 rounded w-full shadow dark:bg-gray-700">
          <div className="flex justify-between dark:text-white">
            <h3>
              {order.firstName} {order.lastName}
            </h3>
            <h3>
              {order.createdAt ? (
                <>
                  {t('orders.createdAt')} : {formatDate(order.createdAt)}{' '}
                </>
              ) : (
                <></>
              )}
            </h3>
            <div className="flex justify-end">
              {order.pickupDate ? (
                <>
                  {t('orders.pickupDate')} : {formatDate(order.pickupDate)}{' '}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex justify-between dark:text-white">
            <h3>
              {order.email} {order.phone}
            </h3>
            <div className="flex items-center justify-end">
              <OrderStatus status={order?.status ? order.status : ''} />
            </div>
          </div>

          <div>
            <p className="dark:text-white">
              {order?.products!.map((product: OrderedProductModel) => (
                <>
                  <span>{product.name + ' ×  ' + product.quantity}</span>
                  <br />
                </>
              ))}
            </p>
          </div>
          <div className="flex justify-end">
            <span className="text-gold-100 mr-1">{t('orders.totalPrice')}</span>
            <span className="dark:text-white">{order.totalPrice + '€'}</span>
          </div>
        </div>
      </button>

      <Transition.Root show={updateStatusModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setUpdateStatusModal}
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
                <OrderChangeStatusModal
                  order={order}
                  setOpenedModal={setUpdateStatusModal}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default OrderCard;
