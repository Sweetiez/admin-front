import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import UpdateOrderStatusRequest from '../../hooks/orders/requests/UpdateOrderStatusRequest';
import OrderModel from './models/OrderModel';
import { updateOrderStatus } from '../../hooks/orders/ordersHooks';

interface OrderChangeStatusModalProps {
  order: OrderModel;
  setOpenedModal: (openedModal: boolean) => void;
}

const OrderChangeStatusModal: React.FC<OrderChangeStatusModalProps> = ({
  order,
  setOpenedModal,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  async function handleOrderStatusUpdate(event: any) {
    event.preventDefault();
    const request = new UpdateOrderStatusRequest(event.target.status.value);

    const response = await updateOrderStatus(
      order?.id ? order.id : '',
      request,
    );
    if (response) {
      addToast(`${t('orders.status-modal.alert_success')}: ${order?.id}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      await queryClient.invalidateQueries('all-orders');
      setOpenedModal(false);
    } else {
      addToast(`${t('orders.status-modal.alert_failed')}: ${order?.id}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="grid bg-white rounded-lg shadow-xl w-fit dark:bg-gray-800">
        <form onSubmit={handleOrderStatusUpdate}>
          <h3 className="pl-4 pt-4 dark:text-white">
            {t('orders.status-modal.client-ref')} : {order.id}
          </h3>
          <h3 className="pl-4 pt-4 dark:text-white">
            {t('orders.status-modal.client-contact')} : {order.email} |{' '}
            {order.phone}
          </h3>

          <div className="flex item-center justify-center pt-10">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold pt-4 pr-3">
              {t('orders.status-modal.status-selector')}
            </label>
            <select
              id="status"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option>PAID</option>
              <option>CANCELED</option>
              <option>READY</option>
              <option>DELIVERED</option>
            </select>
          </div>
          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button
              type="button"
              onClick={() => {
                setOpenedModal(false);
              }}
              className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              {t('orders.status-modal.cancel')}
            </button>
            <input
              type="submit"
              value={t('orders.status-modal.submit')}
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderChangeStatusModal;
