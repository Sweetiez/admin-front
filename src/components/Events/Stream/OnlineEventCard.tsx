import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import Modal from '../../utils/Modal';
import { formatDate } from '../../../hooks/utils/strings';
import OnlineEventModel from './models/OnlineEventModel';
import ReScheduleOnlineEvent from './modals/ReScheduleOnlineEvent';
import {
  cancelOnlineEvent,
  publishOnlineEvent,
} from '../../../hooks/events/onlineEventHooks';

interface OnlineEventCardProps {
  event: OnlineEventModel;
}

const OnlineEventCard: React.FC<OnlineEventCardProps> = ({ event }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [reScheduleModalState, setReScheduleModalState] = useState(false);

  async function handleEventPublish() {
    await publishOnlineEvent(event?.id ? event.id : '');
    await queryClient.invalidateQueries(`all-online-events`);
  }

  async function handleEventCancel() {
    await cancelOnlineEvent(event?.id ? event.id : '');
    await queryClient.invalidateQueries(`all-online-events`);
  }

  return (
    <div className="mb-4 bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-gray-800">
      <div className="flex justify-between dark:text-white">
        <h3 className="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-white">
          {event.title}
        </h3>
        <h3 className="dark:text-white">
          {t('events.main_face_event_cart.schedule', {
            start: formatDate(
              event.schedule?.start ? event.schedule.start : '',
            ),
            end: formatDate(event.schedule?.end ? event.schedule.end : ''),
          })}
        </h3>
        <h3 className="dark:text-white">
          {t('events.main_face_event_cart.availability', {
            taken: event.availability?.placeTaken,
            total: event.availability?.totalPlaces,
          })}
        </h3>
      </div>
      <div className="flex-shrink-0 dark:text-white">
        <span>{event.description}</span>
        <br />
        <span>
          {t('events.main_face_event_cart.anim', {
            firstName: event.animator?.firstname,
            lastName: event.animator?.lastname,
          })}
        </span>
        <div className="flex justify-between">
          <div className="flex flex-row pt-4">
            {event?.status !== 'PUBLISHED' && (
              <button
                onClick={handleEventPublish}
                className="py-2 px-4 shadow-md no-underline rounded-full bg-gold-100 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
              >
                {t('events.cards.btn_publish')}
              </button>
            )}
            <button
              onClick={() => setReScheduleModalState(true)}
              className="py-2 px-4 shadow-md no-underline rounded-full bg-gold-100 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
            >
              {t('events.cards.btn_reschedule')}
            </button>
            <button
              onClick={handleEventCancel}
              className="py-2 px-4 shadow-md no-underline rounded-full bg-gold-100 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
            >
              {t('events.cards.btn_cancel')}
            </button>
          </div>
          <>{event?.status && t('events.status.'+event?.status)}</>
        </div>
      </div>
      <Modal
        modalContent={
          <ReScheduleOnlineEvent
            setOpenedModal={setReScheduleModalState}
            eventData={event}
          />
        }
        modalState={reScheduleModalState}
        setModalState={() => setReScheduleModalState(false)}
      />
    </div>
  );
};

export default OnlineEventCard;
