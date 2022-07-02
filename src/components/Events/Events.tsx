import React, { useState } from 'react';
import Page from '../Page/Page';
import { Role } from '../../hooks/auth/access/Roles';
import AccessRoleController from '../Auth/AccessRoleController';
import { useTranslation } from 'react-i18next';
import Modal from '../utils/Modal';
import CreateSpace from './Face/modals/CreateSpace';
import CreateFaceEvent from './Face/modals/CreateFaceEvent';

const Events: React.FC = () => {
  const { t } = useTranslation();
  const [addSpaceModalState, setAddSpaceModalState] = useState(false);
  const [addEventModalState, setAddEventModalState] = useState(false);

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
