import React from 'react';
import {useTranslation} from "react-i18next";

interface OrderStatusProps {
  status: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  const {t} = useTranslation()
  let statusStyle: string;
  let statusText: string;
  switch (status) {
    case 'DELIVERED':
      statusStyle = 'bg-green-200 text-green-600';
      statusText = t('orders.status.delivered')
      break;
    case 'PAID':
      statusStyle = 'bg-indigo-200 text-indigo-600';
      statusText = t('orders.status.paid')
      break;
    case 'CREATED':
      statusStyle = 'bg-red-200 text-red-600';
      statusText = t('orders.status.created')
      break;
    case 'CANCELED':
      statusStyle = 'bg-brown-200 text-brown-600';
      statusText = t('orders.status.canceled')
      break;
    case 'READY':
      statusStyle = 'bg-brown-200 text-brown-600';
      statusText = t('orders.status.ready')
      break;
    default:
      statusStyle = 'bg-brown-200 text-brown-600';
      statusText = t('orders.status.ready')
  }

  return (
    <span className={`${statusStyle} py-1 px-3 rounded-full text-xs`}>
      {statusText}
    </span>
  );
};

export default OrderStatus;
