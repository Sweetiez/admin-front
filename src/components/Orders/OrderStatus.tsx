import React from 'react';

interface OrderStatusProps {
  status: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  let statusStyle: string;
  switch (status) {
    case 'DELIVERED':
      statusStyle = 'bg-green-200 text-green-600';
      break;
    case 'PAID':
      statusStyle = 'bg-indigo-200 text-indigo-600';
      break;
    case 'CREATED':
      statusStyle = 'bg-red-200 text-red-600';
      break;
    default:
      statusStyle = 'bg-brown-200 text-brown-600';
  }

  return (
    <span className={`${statusStyle} py-1 px-3 rounded-full text-xs`}>
      {status}
    </span>
  );
};

export default OrderStatus;
