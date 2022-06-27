import React, { useState } from 'react';
import Page from '../Page/Page';
import AccessRoleController from '../Auth/AccessRoleController';
import { Role } from '../../hooks/auth/access/Roles';
import { useTranslation } from 'react-i18next';
import Modal from '../utils/Modal';
import { useRewards } from '../../hooks/rewards/rewardHooks';
import RewardModel from './models/RewardModel';
import RewardForm from './modals/RewardForm';
import PublishRewardModal from './modals/PublishRewardModal';
import UnPublishRewardModal from './modals/UnPublishRewardModal';

const RewardList: React.FC = () => {
  const { t } = useTranslation();
  const [addModalState, setAddModalState] = useState(false);
  let { data: rewards } = useRewards();

  if (rewards === undefined) {
    rewards = [];
  }

  return (
    <Page>
      <>
        <AccessRoleController redirect="/" role={Role.ADMIN} />
        <div className="flex justify-center">
          <button
            onClick={() => setAddModalState(true)}
            className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
          >
            {t('rewards.button.add')}
          </button>
        </div>
      </>
      <AccessRoleController redirect="/" role={Role.ADMIN} />
      <div className="pt-4 grid grid-cols-8 grid-flow-col gap-4">
        <div className="col-start-1 col-end-2"></div>
        <div className="col-start-2 col-end-5">
          <div>{t('rewards.non-published')}</div>
        </div>
        <div className="row-start-3 2xl:row-start-1 col-start-2 2xl:col-start-5 col-end-5 2xl:col-end-8">
          <div>{t('rewards.published')}</div>
        </div>

        <table className="2xl:row-start-2 col-start-2 2xl:col-start-2 col-end-8 2xl:col-end-5 h-40">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">
                {t('rewards.table.title')}
              </th>
              <th className="py-3 px-6 text-center">
                {t('rewards.table.reward')}
              </th>
              <th className="py-3 px-6 text-center">
                {t('rewards.table.cost')}
              </th>
              <th className="py-3 px-6 text-center">
                {t('rewards.table.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {rewards
              .filter((reward) => reward.state !== 'PUBLISHED')
              .map((reward, index) => (
                <RewardTableRow reward={reward} key={index} _id={index} />
              ))}
          </tbody>
        </table>
        <table className="row-start-4 2xl:row-start-2 col-start-2 2xl:col-start-5 col-end-8 2xl:col-end-8 h-40">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">
                {t('rewards.table.title')}
              </th>
              <th className="py-3 px-6 text-center">
                {t('rewards.table.reward')}
              </th>
              <th className="py-3 px-6 text-center">
                {t('rewards.table.cost')}
              </th>
              <th className="py-3 px-6 text-center">
                {t('rewards.table.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {rewards
              .filter((reward) => reward.state === 'PUBLISHED')
              .map((reward, index) => (
                <RewardTableRow reward={reward} key={index} _id={index} />
              ))}
          </tbody>
        </table>
      </div>

      <Modal
        modalContent={<RewardForm setOpenedModal={setAddModalState} />}
        modalState={addModalState}
        setModalState={() => setAddModalState(false)}
        persistent={true}
      />
    </Page>
  );
};

interface RewardTableRowProps {
  _id: number;
  reward: RewardModel;
}

const RewardTableRow: React.FC<RewardTableRowProps> = ({ _id, reward }) => {
  const [modifyModalState, setModifyModalState] = useState(false);
  const [publishModalState, setPublishModalState] = useState(false);
  const [unPublishModalState, setUnPublishModalState] = useState(false);

  const lineColor = `border-b border-gray-200 ${
    _id % 2 === 0 ? 'dark:bg-gray-100' : 'dark:bg-gray-300 bg-gray-50'
  } hover:bg-gray-100`;

  const isPublished = reward.state === 'PUBLISHED';

  const publishSVG = (
    <svg
      fill="#FFF"
      height="18"
      viewBox="0 0 24 24"
      width="18"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </svg>
  );

  const unpublishedSVG = (
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="18px"
      height="18px"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
    >
      <polygon
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeMiterlimit="10"
        points="44,18 54,18 54,63 10,63 10,18 20,18 "
      />
      <line
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="39"
        y1="49"
        x2="25"
        y2="35"
      />
      <line
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="25"
        y1="49"
        x2="39"
        y2="35"
      />
      <path
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M22,24V11c0-5.523,4.477-10,10-10s10,4.477,10,10v13"
      />
    </svg>
  );

  return (
    <>
      <tr className={lineColor}>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span className="font-medium">{reward.name}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">{reward.productName}</div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">{reward.cost}</div>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            <div
              onClick={() => setModifyModalState(true)}
              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <div
              onClick={
                isPublished
                  ? () => setUnPublishModalState(true)
                  : () => setPublishModalState(true)
              }
              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
            >
              {isPublished ? unpublishedSVG : publishSVG}
            </div>
          </div>
        </td>
      </tr>
      <Modal
        modalContent={
          <RewardForm reward={reward} setOpenedModal={setModifyModalState} />
        }
        modalState={modifyModalState}
        setModalState={() => setModifyModalState(false)}
        persistent={true}
      />
      <Modal
        modalContent={
          <PublishRewardModal
            reward={reward}
            setOpenedModal={setPublishModalState}
          />
        }
        modalState={publishModalState}
        setModalState={() => setPublishModalState(false)}
      />
      <Modal
        modalContent={
          <UnPublishRewardModal
            reward={reward}
            setOpenedModal={setUnPublishModalState}
          />
        }
        modalState={unPublishModalState}
        setModalState={() => setUnPublishModalState(false)}
      />
    </>
  );
};

export default RewardList;
