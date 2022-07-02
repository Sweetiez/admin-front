import React from 'react';
import { useTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { useMutation, useQueryClient } from 'react-query';
import { createSpace } from '../../../../hooks/events/spacesHooks';
import CreateSpaceRequest from '../../../../hooks/events/requests/CreateSpaceRequest';

interface CreateSpaceProps {
  setOpenedModal: (openedModal: boolean) => void;
}

const CreateSpace: React.FC<CreateSpaceProps> = ({ setOpenedModal }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  const { mutate } = useMutation(createSpace, {
    onSuccess: async (data: any) => {
      addToast(`${t('events.spaces.success')}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      await queryClient.invalidateQueries('all-spaces');
      setOpenedModal(false);
    },
    onError: (err: any) => {
      addToast(err.message, { appearance: 'error', autoDismiss: true });
    },
  });

  const submitSpaceCreation = async (event: any) => {
    event.preventDefault();

    const request = new CreateSpaceRequest(
      event.target.address.value,
      event.target.city.value,
      event.target.zipCode.value,
      Number(event.target.places.value),
    );

    if (!request.isValid()) {
      addToast(`${t('recipes.create.alert.empty')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    mutate(request);
  };
  return (
    <div className="overflow-x-auto">
      <div className="grid bg-white rounded-lg shadow-xl w-fit dark:bg-gray-800">
        <div className="flex justify-center py-4">
          {/*<Lottie*/}
          {/*  className="h-32 w-fit"*/}
          {/*  loop*/}
          {/*  animationData={animationJson}*/}
          {/*  play*/}
          {/*/>*/}
        </div>

        <form onSubmit={submitSpaceCreation}>
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl dark:text-white">
                {t('events.spaces.title')}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('events.spaces.address')}
            </label>
            <input
              id="address"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('events.spaces.address')}
              required
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('events.spaces.city')}
            </label>
            <input
              id="city"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('events.spaces.city')}
              required
            />
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('events.spaces.zipCode')}
            </label>
            <input
              id="zipCode"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('events.spaces.zipCode')}
              required
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('events.spaces.places')}
            </label>
            <input
              id="places"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="number"
              placeholder={t('events.spaces.places')}
              required
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
              {t('recipes.button.cancel')}
            </button>
            <input
              type="submit"
              value={t('events.spaces.btn_add')}
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSpace;
