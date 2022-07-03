import React, { useState } from 'react';
import EventModel from '../rewads/models/EventModel';
import { useTranslation } from 'react-i18next';
import {
  cancelFaceEvent,
  publishFaceEvent,
} from '../../hooks/events/faceEventHooks';
import { useQueryClient } from 'react-query';
import Modal from '../utils/Modal';
import ReScheduleEvent from './Face/modals/ReScheduleEvent';

interface EventCardProps {
  event: EventModel;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [reScheduleModalState, setReScheduleModalState] = useState(false);

  async function handleEventPublish() {
    await publishFaceEvent(event?.id ? event.id : '');
    await queryClient.invalidateQueries(`all-face-events`);
  }

  async function handleEventCancel() {
    await cancelFaceEvent(event?.id ? event.id : '');
    await queryClient.invalidateQueries(`all-face-events`);
  }

  return (
    <div className="mb-4 bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-gray-800">
      <div className="flex justify-between dark:text-white">
        <h3 className="text-2xl sm:text-3xl leading-none font-bold text-gray-900 dark:text-white">
          {event.title}
        </h3>
        <h3 className="dark:text-white">
          {t('events.main_face_event_cart.schedule', {
            start: event.schedule?.start,
            end: event.schedule?.end,
          })}
          {/*Du {event.schedule?.start} au {event.schedule?.end}*/}
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
          {event.localisation?.address} {event.localisation?.city} -{' '}
          {event.localisation?.zipCode}
        </span>
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
                className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
              >
                Publier
              </button>
            )}
            <button
              onClick={() => setReScheduleModalState(true)}
              className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
            >
              Re-Planifier
            </button>
            <button
              onClick={handleEventCancel}
              className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
            >
              Annuler
            </button>
          </div>
          <>{event?.status}</>
        </div>
      </div>
      <Modal
        modalContent={
          <ReScheduleEvent
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

export default EventCard;
