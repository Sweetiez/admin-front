import React from 'react';
import { useTranslation } from 'react-i18next';
import OrderedProductModel from './models/OrderedProductModel';
import OrderModel from './models/OrderModel';
import OrderStatus from './OrderStatus';

interface OrderCardProps {
  order: OrderModel;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { t } = useTranslation();
  function formatDate(date: string) {
    const [year, month, day] = date.split('-');
    [day, month, year].join('/');
    return (
      <span className="font-semibold ml-1">{[day, month, year].join('/')}</span>
    );
  }
  return (
    <>
      <div className="mx-auto p-6 bg-white border my-2 rounded w-full shadow">
        <div className="flex justify-between ">
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
        <div className="flex justify-between ">
          <h3>
            {order.email} {order.phone}
          </h3>
          <div className="flex items-center justify-end">
            <OrderStatus status={order?.status ? order.status : ''} />
          </div>
        </div>

        <div>
          <p>
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
          {order.totalPrice + '€'}
        </div>
      </div>
    </>
  );
};

export default OrderCard;
