import React from 'react';
import MinimalOrderModel from '../models/MinimalOrderModel';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface DashboardOrdersProps {
  minimalOrder: MinimalOrderModel[];
}

const DashboardOrders: React.FC<DashboardOrdersProps> = ({ minimalOrder }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t('dashboard.orders.title')}
          </h3>
          <span className="text-base font-normal text-gray-500">
            {t('dashboard.orders.subtitle')}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <Link to="/admin/orders">
            <div className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
              {t('dashboard.orders.button')}
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="overflow-x-auto rounded-lg">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('dashboard.orders.th_client')}
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('dashboard.orders.th_pickup_date')}
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('dashboard.orders.th_price')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {minimalOrder.map((order, index) => (
                    <tr key={index}>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        <span className="font-semibold">{order.email}</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        {order.pickupDate}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {order.total} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrders;
