import Page from '../Page/Page';
import { Role } from '../../hooks/auth/access/Roles';
import AccessRoleController from '../Auth/AccessRoleController';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <Page>
      <AccessRoleController redirect="/" role={Role.ADMIN} />
      <h1>Dashboard</h1>
    </Page>
  );
};

export default Dashboard;
