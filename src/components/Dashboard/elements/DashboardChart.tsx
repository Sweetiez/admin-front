import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import CharItemModel from '../models/CharItemModel';
import DashboardInformationsModel from '../models/DashboardInformationsModel';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  tension: 0.5,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Revenu chart',
    },
  },
};

interface DashboardChartProps {
  chartItems: CharItemModel[];
  infos: DashboardInformationsModel | undefined;
}

const DashboardChart: React.FC<DashboardChartProps> = ({
  chartItems,
  infos,
}) => {
  const { t } = useTranslation();
  const labels = chartItems.map((item) => item.date).reverse();

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Revenus',
        data: chartItems.map((item) => item.value).reverse(),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-shrink-0">
          <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
            {infos?.monthlySales} €
          </span>
          <h3 className="text-base font-normal text-gray-500">
            {t('dashboard.chart.title')}
          </h3>
        </div>
      </div>
      <div id="main-chart">
        <Line height={'0%'} options={options} data={data} />
      </div>
    </div>
  );
};

export default DashboardChart;
