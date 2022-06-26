import React from 'react';
import { useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import Lottie from 'react-lottie-player';
import { useTranslation } from 'react-i18next';
import animationJson from '../../../assets/lotties/reward.json';
import RewardModel from '../models/RewardModel';
import ChangeStateRewardRequest from '../../../hooks/rewards/requests/ChangeStateRewardRequest';
import { publishReward } from '../../../hooks/rewards/rewardHooks';

interface PublishRewardModalProps {
  reward: RewardModel;
  setOpenedModal: (openedModal: boolean) => void;
}

const PublishRewardModal: React.FC<PublishRewardModalProps> = ({
  reward,
  setOpenedModal,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  async function handlePublishReward(id: string) {
    const request = new ChangeStateRewardRequest(id);
    await publishReward(request);
    await queryClient.invalidateQueries(`rewards`);
    addToast(`${t('rewards.publish.alert.success')}`, {
      appearance: 'info',
      autoDismiss: true,
    });
    setOpenedModal(false);
  }

  return (
    <>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <Lottie
            className="h-fit w-fit"
            loop={false}
            animationData={animationJson}
            play
          />
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              {t('rewards.publish.title')}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {t('rewards.publish.message')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          onClick={() => handlePublishReward(reward?.id ? reward.id : '')}
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          {t('rewards.publish.submit')}
        </button>
        <button
          onClick={() => {
            setOpenedModal(false);
          }}
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          {t('products.cancel_btn')}
        </button>
      </div>
    </>
  );
};

export default PublishRewardModal;
