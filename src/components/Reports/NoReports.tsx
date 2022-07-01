import React from 'react';
import Lottie from 'react-lottie-player';
import animationJson from '../../assets/lotties/reward.json';
import { useTranslation } from 'react-i18next';

const NoReports: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-100 flex-auto items-center md:px-40 py-6 dark:bg-gray-900">
      <div className="flex justify-center ">
        <div>
          <h1 className="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-white">
            {t('reports.no_reports')}
          </h1>
          <Lottie
            className="h-fit w-fit"
            loop={false}
            animationData={animationJson}
            play
          />
        </div>
      </div>
    </div>
  );
};

export default NoReports;
