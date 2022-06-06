import React from 'react';
import Page from '../Page/Page';
import AccessRoleController from '../Auth/AccessRoleController';
import { Role } from '../../hooks/auth/access/Roles';
import { useReports } from '../../hooks/reports/reportsHooks';
import ReportCard from "./ReportCard";

const ReportList: React.FC = () => {
  let { data: reports } = useReports();

  return (
    <>
      <AccessRoleController redirect="/" role={Role.ADMIN} />
      <Page>
        <div>
          {reports?.map((report) => (
              <ReportCard key={report.id} report={report}/>
          ))}
        </div>
      </Page>
    </>
  );
};

export default ReportList;
