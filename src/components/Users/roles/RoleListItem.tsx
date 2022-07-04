import React, { useState } from 'react';
import RoleModel from '../models/RoleModel';
import Modal from '../../utils/Modal';
import ModifyRoleModal from '../modals/ModifyRoleModal';

interface RoleListItemProps {
  role: RoleModel;
}

const RoleListItem: React.FC<RoleListItemProps> = ({ role }) => {
  const [modifyRoleModalState, setModifyRoleModalState] = useState(false);
  return (
    <div className="py-1 flex justify-between">
      <span className="leading-none text-gray-900 dark:text-white">
        {role.name}
      </span>

      <div
        onClick={() => setModifyRoleModalState(true)}
        className="ml-4 w-4 transform hover:text-purple-500 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
      <Modal
        modalContent={
          <ModifyRoleModal
            setModalState={setModifyRoleModalState}
            role={role}
          />
        }
        modalState={modifyRoleModalState}
        setModalState={() => setModifyRoleModalState(false)}
      />
    </div>
  );
};

export default RoleListItem;
