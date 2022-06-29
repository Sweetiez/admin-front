import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DashboardSaleModel from '../models/DashboardSaleModel';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardBestSalesProps {
  bestSales: DashboardSaleModel[] | undefined;
}

const DashboardBestSales: React.FC<DashboardBestSalesProps> = ({
  bestSales,
}) => {
  const { t } = useTranslation();

  const data = {
    labels: bestSales?.map((sale) => sale.name),
    datasets: [
      {
        label: '# of Votes',
        data: bestSales?.map((sale) => sale.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900">
          {t('dashboard.sales.title')}
        </h3>
      </div>
      <div className="flow-root">
        <Doughnut
          height="50%"
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: true,
          }}
        />
      </div>
    </div>
  );
};

export default DashboardBestSales;
