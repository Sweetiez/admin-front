import Page from '../Page/Page';
import { Role } from '../../hooks/auth/access/Roles';
import AccessRoleController from '../Auth/AccessRoleController';
import React from 'react';
import DashboardChart from './elements/DashboardChart';
import DashboardOrders from './elements/DashboardOrders';
import DashboardCard from './elements/DashboardCard';
import { useDashboard } from '../../hooks/dashboards/dashboardHooks';
import DashboardBestSales from './elements/DashboardBestSales';

const Dashboard: React.FC = () => {
  const { data: dashboardData } = useDashboard();

  console.log(dashboardData);

  return (
    <Page>
      <AccessRoleController redirect="/" role={Role.ADMIN} />
      <div
        id="main-content"
        className="h-full w-full bg-gray-50 relative overflow-y-auto dark:bg-gray-900"
      >
        <div className="pt-6 px-4">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <DashboardChart
              chartItems={
                dashboardData?.salesChart ? dashboardData?.salesChart : []
              }
              infos={
                dashboardData?.informations
                  ? dashboardData?.informations
                  : undefined
              }
            />
            <DashboardOrders
              minimalOrder={
                dashboardData?.tenFirstOrders
                  ? dashboardData?.tenFirstOrders
                  : []
              }
            />
          </div>
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <DashboardCard
              title={'Nombres de comptes créés'}
              value={
                dashboardData?.informations?.accounts
                  ? dashboardData?.informations?.accounts
                  : -1
              }
            />
            <DashboardCard
              title={'Plateaux en ligne'}
              value={
                dashboardData?.informations?.publishedTrays
                  ? dashboardData?.informations?.publishedTrays
                  : -1
              }
            />
            <DashboardCard
              title={'Mignardises en ligne'}
              value={
                dashboardData?.informations?.publishedSweets
                  ? dashboardData?.informations?.publishedSweets
                  : -1
              }
            />
            <DashboardCard
              title={'Recettes en ligne'}
              value={
                dashboardData?.informations?.publishedRecipes
                  ? dashboardData?.informations?.publishedRecipes
                  : -1
              }
            />
          </div>
          <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
            <DashboardBestSales
              bestSales={
                dashboardData?.topSales ? dashboardData.topSales : undefined
              }
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
