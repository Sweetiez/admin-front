import React, { useState } from 'react';
import Page from '../Page/Page';
import { Role } from '../../hooks/auth/access/Roles';
import AccessRoleController from '../Auth/AccessRoleController';
import { useTranslation } from 'react-i18next';
import Modal from '../utils/Modal';
import CreateSpace from './Face/modals/CreateSpace';
import CreateFaceEvent from './Face/modals/CreateFaceEvent';
import { useFaceEvent } from '../../hooks/events/faceEventHooks';
import EventCard from './EventCard';

const Events: React.FC = () => {
  const { t } = useTranslation();
  const [addSpaceModalState, setAddSpaceModalState] = useState(false);
  const [addEventModalState, setAddEventModalState] = useState(false);
  const { data: faceEvents } = useFaceEvent();

  console.log(faceEvents);

  return (
    <Page>
      <AccessRoleController redirect="/" role={Role.ADMIN} />
      <div className="pt-4 flex justify-center">
        <button
          onClick={() => setAddSpaceModalState(true)}
          className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
        >
          {t('events.spaces.btn_add')}
        </button>
        <button
          onClick={() => setAddEventModalState(true)}
          className="py-2 px-4 shadow-md no-underline rounded-full bg-indigo-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
        >
          {t('events.face.btn_add')}
        </button>
      </div>

      <div className="bg-gray-100 flex-auto items-center md:px-40 py-6 dark:bg-gray-600">
        <div className="flex justify-between ">
          <div className="font-dark font-bold pt-4 align font-birthstone text-5xl dark:text-white">
            {t('events.main_face_event.title')}
          </div>
        </div>
      </div>
      <div className="px-16 flex flex-col justify-center">
        {faceEvents?.map((faceEvent, index) => (
          <EventCard event={faceEvent} key={index} />
        ))}
      </div>

      <Modal
        modalContent={<CreateSpace setOpenedModal={setAddSpaceModalState} />}
        modalState={addSpaceModalState}
        setModalState={() => setAddSpaceModalState(false)}
      />
      <Modal
        modalContent={
          <CreateFaceEvent setOpenedModal={setAddEventModalState} />
        }
        modalState={addEventModalState}
        setModalState={() => setAddEventModalState(false)}
        persistent={true}
      />
    </Page>
  );
};

export default Events;
