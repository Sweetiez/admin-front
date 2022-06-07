import React, { useCallback, useState } from 'react';
import Page from '../Page/Page';
import AccessRoleController from '../Auth/AccessRoleController';
import { Role } from '../../hooks/auth/access/Roles';
import { useReports } from '../../hooks/reports/reportsHooks';
import ReportCard from './ReportCard';
import Lottie from 'react-lottie-player';
import animationJudgement from '../../assets/lotties/judgement.json';
import Test from '../utils/Test';

const ReportList: React.FC = () => {
  let { data: reports } = useReports();
  const [animationModalState, setAnimationModalState] = useState(true);
  const setAnimationModalStateClose = useCallback(() => {
    setAnimationModalState(false);
  }, []);

  return (
    <>
      <AccessRoleController redirect="/" role={Role.ADMIN} />
      <Page>
        <Test
          modalContent={
            <Lottie
              speed={3}
              className="h-fit w-fit"
              loop={false}
              animationData={animationJudgement}
              play
            />
          }
          modalState={animationModalState}
          setModalState={setAnimationModalStateClose}
        />

        <div>
          {reports?.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </Page>
    </>
  );
};

export default ReportList;
