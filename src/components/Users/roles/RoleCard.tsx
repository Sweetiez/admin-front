import React, { useState } from 'react';
import { useRoles } from '../../../hooks/users/roleHooks';
import { useTranslation } from 'react-i18next';
import Modal from '../../utils/Modal';
import AddRoleModal from '../modals/AddRoleModal';
import RoleListItem from './RoleListItem';

const RoleCard: React.FC = () => {
  const { t } = useTranslation();
  const { data: roles } = useRoles();
  const [addRoleModalState, setAddRoleModalState] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-gray-800">
      <div className="font-bold text-gray-900 dark:text-white">
        {t('users.roles.title')}
      </div>

      <div className="pt-4 flex items-center">
        <div className="flex-shrink-0">
          {roles?.map((role, index) => (
            <RoleListItem role={role} key={index} />
          ))}
        </div>
      </div>
      <button
        onClick={() => setAddRoleModalState(true)}
        className="mt-4 py-2 px-4 shadow-md no-underline rounded-full bg-purple-500 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
      >
        {t('users.roles.btn_add')}
      </button>
      <Modal
        modalContent={
          <AddRoleModal setAddRoleModalState={setAddRoleModalState} />
        }
        modalState={addRoleModalState}
        setModalState={() => setAddRoleModalState(false)}
      />
    </div>
  );
};

export default RoleCard;
