import React, { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { useTranslation } from 'react-i18next';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { capitalizeFirstLetter } from '../../../../hooks/utils/strings';
import { useAnimators } from '../../../../hooks/events/animatorHooks';
import CreateOnlineEventRequest from '../../../../hooks/events/requests/CreateOnlineEventRequest';
import { createOnlineEvent } from '../../../../hooks/events/onlineEventHooks';
import AnimatorModel from '../../Face/models/AnimatorModel';

interface CreateFaceEventProps {
  setOpenedModal: (openedModal: boolean) => void;
}
const CreateFaceEvent: React.FC<CreateFaceEventProps> = ({
  setOpenedModal,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  /**
   * Animators management
   */
  const [searchingAnimators, setSearchingAnimators] = useState('');
  const [animators, setAnimators] = useState<AnimatorModel[]>([]);
  const [animatorSelected, setAnimatorSelected] = useState<AnimatorModel>();
  let { data: animatorData } = useAnimators();

  const animatorsFiltered = useMemo(() => {
    let data = animatorData;
    animators.forEach(
      (s) => (data = data?.filter((sp) => sp.animatorId !== s.animatorId)),
    );
    return data;
  }, [animatorData, animators]);

  const addAnimator = () => {
    if (animatorSelected) {
      let animatorItem = {
        animatorId: animatorSelected?.animatorId,
        name: animatorSelected?.name,
      };
      const existing = animators.find(
        (s) => s.animatorId === animatorSelected?.animatorId,
      );
      if (existing) {
        setAnimators([...animators]);
      } else {
        setAnimators([...animators, animatorItem]);
      }
      setAnimatorSelected(undefined);
      setSearchingAnimators('');
    }
  };

  const handleOnSelectAnimator = (item: any) => {
    setAnimatorSelected(item);
  };

  const handleOnClearAnimator = () => {
    setAnimatorSelected(undefined);
  };

  const handleDeleteSweetAnimator = (id: string) => {
    setAnimators(animators.filter((s) => s.animatorId !== id));
  };

  const submitOnlineEventCreation = async (event: any) => {
    event.preventDefault();
    const title = capitalizeFirstLetter(event.target.title.value);
    const description = event.target.description.value;
    const startDateTime = event.target.start.value;
    const duration = event.target.duration.value;
    const places = event.target.places.value;

    if (
      title === '' ||
      description === '' ||
      startDateTime === '' ||
      animators.length < 1
    ) {
      addToast(`${t('products.trays.add.alert_failed_empty')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    const request = new CreateOnlineEventRequest(
      animators[0].animatorId ? animators[0].animatorId : '',
      title,
      description,
      startDateTime,
      Number(duration),
      Number(places),
    );

    try {
      await createOnlineEvent(request);
      await queryClient.invalidateQueries(`all-online-events`);
      addToast(`${t('events.notification.event_created')}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      setOpenedModal(false);
    } catch (e) {
      addToast(`${t('events.notification.event_failed')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid bg-white rounded-lg shadow-xl w-fit dark:bg-gray-800">
        <div className="flex justify-center py-4">
          <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
        </div>

        <form onSubmit={submitOnlineEventCreation}>
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl dark:text-white">
                {t('events.face.btn_add')}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('events.face.title')}
            </label>
            <input
              id="title"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('events.face.title')}
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('events.face.description')}
            </label>
            <input
              id="description"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('events.face.description')}
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('events.face.startDateTime')}
            </label>
            <input
              id="start"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="datetime-local"
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
              min={1}
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('events.face.duration')}
            </label>
            <input
              id="places"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="number"
              placeholder={t('events.face.duration')}
              min={2}
              max={6}
            />
          </div>

          <div className="grid mb-3 grid-cols-1 md:grid-cols-4 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1 col-span-3">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
                {t('events.face.animator')}
              </label>
            </div>
          </div>
          {animators.length <= 0 && (
            <div className="grid mb-3 grid-cols-1 md:grid-cols-4 gap-5 md:gap-8 mt-5 mx-7">
              <div className="grid grid-cols-1 col-span-2">
                <ReactSearchAutocomplete
                  items={animatorsFiltered}
                  fuseOptions={{ keys: ['name'] }}
                  resultStringKeyName="name"
                  onSelect={handleOnSelectAnimator}
                  onClear={handleOnClearAnimator}
                  onSearch={(value: string) => setSearchingAnimators(value)}
                  inputSearchString={searchingAnimators}
                  showIcon={false}
                  placeholder={t('products.search')}
                  styling={{
                    height: '39px',
                    border:
                      '2px solid rgba(196, 181, 253, var(--tw-border-opacity))',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    hoverBackgroundColor: '#d8b4fe',
                    fontSize: '16px',
                    iconColor: '#d8b4fe',
                    lineColor: '#c084fc',
                    clearIconMargin: '3px 8px 0 0',
                    zIndex: 2,
                  }}
                />
              </div>

              <div className="grid grid-cols-1">
                <button
                  type="button"
                  onClick={() => {
                    addAnimator();
                  }}
                  className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
                >
                  {t('products.add')}
                </button>
              </div>
            </div>
          )}

          {animators.length > 0 && (
            <div className="grid px-4 grid-cols-1 mt-1 mx-7 overflow-auto max-h-36 rounded-lg border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ">
              {animators.map((animator) => (
                <div
                  className="flex items-center justify-between my-1"
                  key={animator.animatorId}
                >
                  <div>{animator.name}</div>
                  <span
                    className="ml-1"
                    onClick={() =>
                      animator.animatorId &&
                      handleDeleteSweetAnimator(animator.animatorId)
                    }
                  >
                    <svg
                      className="mt-0.5 ml-0.5 w-4 h-4 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          )}

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
    // return(
    // <>zer</>
  );
};

export default CreateFaceEvent;
