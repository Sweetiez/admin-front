import React, { useState } from 'react';
import Page from '../Page/Page';
import { Role } from '../../hooks/auth/access/Roles';
import AccessRoleController from '../Auth/AccessRoleController';
import { useTranslation } from 'react-i18next';
import FaceEvent from './Face/FaceEvent';
import StreamingEvent from './Stream/StreamingEvent';

const Events: React.FC = () => {
  const { t } = useTranslation();
  const [renderFaceEvent, setRenderFaceEvent] = useState(true);

  return (
    <Page>
      <AccessRoleController redirect="/" role={Role.ADMIN} />
      <div className="pt-4 flex justify-center">
        <button
          onClick={() => setRenderFaceEvent(!renderFaceEvent)}
          className={`py-2 px-4 shadow-md no-underline rounded-full ${
            renderFaceEvent ? 'bg-gold-100' : 'bg-indigo-500'
          } text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2`}
        >
          {renderFaceEvent
            ? t('events.main_face_event.switch_btn_2')
            : t('events.main_face_event.switch_btn_1')}
        </button>
      </div>
      {renderFaceEvent ? <FaceEvent /> : <StreamingEvent />}
    </Page>
  );
};

export default Events;
