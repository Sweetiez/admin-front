import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../utils/Modal';
import CreateOnlineEvent from './modals/CreateOnlineEvent';
import { useOnlineEvent } from '../../../hooks/events/onlineEventHooks';
import OnlineEventCard from './OnlineEventCard';

const StreamingEvent: React.FC = () => {
  const { t } = useTranslation();
  const [addEventModalState, setAddEventModalState] = useState(false);
  const { data: onlineEvents } = useOnlineEvent();

  return (
    <>
      <div className="pt-4 flex justify-center">
        <button
          onClick={() => setAddEventModalState(true)}
          className="py-2 px-4 shadow-md no-underline rounded-full bg-gold-100 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
        >
          {t('events.online.btn_add')}
        </button>
      </div>

      <div className="bg-gray-100 flex-auto items-center md:px-40 py-6 dark:bg-gray-600">
        <div className="flex justify-between ">
          <div className="font-dark font-bold pt-4 align font-birthstone text-5xl dark:text-white">
            {t('events.main_online_event.title')}
          </div>
        </div>
      </div>
      <div className="px-16 flex flex-col justify-center">
        {onlineEvents?.map((onlineEvent, index) => (
          <OnlineEventCard event={onlineEvent} key={index} />
        ))}
      </div>

      <Modal
        modalContent={
          <CreateOnlineEvent setOpenedModal={setAddEventModalState} />
        }
        modalState={addEventModalState}
        setModalState={() => setAddEventModalState(false)}
        persistent={true}
      />
    </>
  );
};

export default StreamingEvent;
