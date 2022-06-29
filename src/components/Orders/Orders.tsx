import React, { useState } from 'react';
import Page from '../Page/Page';
import AccessRoleController from '../Auth/AccessRoleController';
import { Role } from '../../hooks/auth/access/Roles';
import { useTranslation } from 'react-i18next';
import { useOrders } from '../../hooks/orders/ordersHooks';
import OrderCard from './OrderCard';

const Orders: React.FC = () => {
  const { t } = useTranslation();
  const [previousCommands, setPreviousCommands] = useState(false);
  const { data: orderData } = useOrders();

  return (
    <Page>
      <AccessRoleController redirect="/" role={Role.ADMIN} />
      <div className="bg-gray-100 flex-auto items-center md:px-40 py-6 dark:bg-gray-900">
        <div className="flex justify-between ">
          <div className="font-dark font-bold pt-4 align font-birthstone text-5xl dark:text-white">
            {t('orders.title')}
          </div>
          <div className="flex justify-center">
            <div className="form-check form-switch">
              <input
                className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                type="checkbox"
                role="switch"
                checked={previousCommands}
                onChange={() => {
                  setPreviousCommands(!previousCommands);
                }}
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label inline-block text-gray-800 dark:text-white"
                htmlFor="flexSwitchCheckDefault"
              >
                {t('orders.checkbox-label')}
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {previousCommands
            ? orderData?.map((order, index) => (
                <OrderCard key={index} order={order} />
              ))
            : orderData
                ?.filter((order) => order.status !== 'DELIVERED')
                .map((order, index) => <OrderCard key={index} order={order} />)}
        </div>
      </div>
    </Page>
  );
};

export default Orders;
