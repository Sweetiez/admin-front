import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DashboardSaleModel from '../models/DashboardSaleModel';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie-player';
import animationJson from '../../../assets/lotties/empty-cart.json';

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
    <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          {t('dashboard.sales.title')}
        </h3>
      </div>
      <div className="flow-root">
        {bestSales?.length && bestSales?.length > 0 ? (
          <Doughnut
            height="50%"
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
        ) : (
          <>
            <Lottie
              className="h-96 w-fit"
              loop={false}
              animationData={animationJson}
              play
            />
            <div className="flex justify-center">
              <h3 className="text-base font-normal text-gray-500 dark:text-gray-200">
                {t('dashboard.sales.empty')}
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardBestSales;
