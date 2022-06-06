import React, { useCallback, useState} from 'react';
import ReportModel from './models/ReportModel';
import {
  useEvaluationById,
} from '../../hooks/reports/reportsHooks';
import {useTranslation} from "react-i18next";
import Modal from "../utils/Modal";
import ValidateDeleteJudgement from "./ValidateDeleteJudgement";
import ValidateCancelJudgement from "./ValidateCancelJudgement";

interface ReportCardProps {
  report: ReportModel;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const { t } = useTranslation();
  const [judgementDeleteModalState, setJudgementDeleteModalState] = useState(false);
  const [judgementCancelModalState, setJudgementCancelModalState] = useState(false);
  let { data: evaluation } = useEvaluationById(report.evaluationId!);
  const judgementDeleteModalCloseClick = useCallback(() => {
    setJudgementDeleteModalState(false);
  }, []);

  const judgementCancelModalCloseClick = useCallback(() => {
    setJudgementCancelModalState(false);
  }, []);


  const handleDeleteComment = () => {

  };

  const handleCancelReport = () => {

  };

  return (
    <>
      <div className="bg-white mb-4 shadow p-4 md:mx-40">
        <div className="flex justify-center">
          <span className="font-semibold text-xl">{t('reports.comment')}</span>
        </div>
        <div className="flex justify-center p-4">{evaluation?.comment}</div>
        <div className="border-t w-full">
          <div className="flex justify-center p-2">
            <span className="font-semibold text-xl">{t('reports.reason')}</span>
          </div>
          <div className="flex justify-center p-2 mb-2">
            {report.reason !== 'other' ? (
              <span className="capitalize">{report.reason}</span>
            ) : (
              <span>{report.content}</span>
            )}
          </div>
          <div className="flex justify-center">
            <button className="rounded-lg bg-red-600 text-xs text-white p-2 shadow" onClick={() => setJudgementDeleteModalState(true)}>
              {t('reports.deleteComment')}
            </button>
            <button className="rounded-lg bg-green-600 text-xs text-white p-2 shadow ml-2" onClick={() => setJudgementCancelModalState(true)}>
              {t('reports.cancelReport')}
            </button>
          </div>
        </div>
      </div>
      <Modal modalContent={<ValidateDeleteJudgement manageClick={handleDeleteComment} manageClickClose={judgementDeleteModalCloseClick}/>} modalState={judgementDeleteModalState} setModalState={judgementDeleteModalCloseClick}/>
      <Modal modalContent={<ValidateCancelJudgement manageClick={handleCancelReport} manageClickClose={judgementCancelModalCloseClick}/>} modalState={judgementCancelModalState} setModalState={judgementCancelModalCloseClick}/>
    </>
  );
};

export default ReportCard;
