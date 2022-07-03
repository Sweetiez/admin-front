import React from 'react';
import { useTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import ReScheduleEventRequest from '../../../../hooks/events/requests/ReScheduleEventRequest';
import { useQueryClient } from 'react-query';
import OnlineEventModel from '../models/OnlineEventModel';
import { reScheduleOnlineEvent } from '../../../../hooks/events/onlineEventHooks';

interface ReScheduleOnlineEventProps {
  setOpenedModal: (openedModal: boolean) => void;
  eventData: OnlineEventModel;
}

const ReScheduleOnlineEvent: React.FC<ReScheduleOnlineEventProps> = ({
  eventData,
  setOpenedModal,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  async function submitReSchedule(event: any) {
    event.preventDefault();
    const startDateTime = event.target.start.value;
    const duration = Number(event.target.duration.value);

    if (startDateTime === '' || duration <= 0) {
      addToast(`${t('products.trays.add.alert_failed_empty')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    const request = new ReScheduleEventRequest(
      eventData?.id ? eventData.id : '',
      startDateTime,
      duration,
    );

    const response = await reScheduleOnlineEvent(request);

    if (response) {
      addToast(`${t('events.notification.event_updated')}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      setOpenedModal(false);
      await queryClient.invalidateQueries(`all-online-events`);
    } else {
      addToast(`${t('events.notification.event_failed')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="grid bg-white rounded-lg shadow-xl w-fit dark:bg-gray-800">
        <div className="flex justify-center py-4"></div>

        <form onSubmit={submitReSchedule}>
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl dark:text-white">
                {t('events.spaces.title')}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('events.face.startDateTime')}
            </label>
            <input
              id="start"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="datetime-local"
              defaultValue={eventData.schedule?.start}
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('events.face.duration')}
            </label>
            <input
              id="duration"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="number"
              placeholder={t('events.face.duration')}
              defaultValue={1}
              min={1}
            />
          </div>

          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button
              type="button"
              onClick={() => {
                setOpenedModal(false);
              }}
              className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              {t('products.cancel_btn')}
            </button>
            <input
              type="submit"
              value={t('products.save_btn')}
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReScheduleOnlineEvent;
