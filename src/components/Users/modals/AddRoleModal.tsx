import React from 'react';
import { useTranslation } from 'react-i18next';
import AddRoleRequest from '../../../hooks/users/request/AddRoleRequest';
import { createRole } from '../../../hooks/users/roleHooks';
import { useQueryClient } from 'react-query';

interface AddRoleModalProps {
  setAddRoleModalState: (state: boolean) => void;
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({
  setAddRoleModalState,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  async function handleSubmit(event: any) {
    event.preventDefault();
    const request = new AddRoleRequest(event.target.role.value);

    try {
      await createRole(request);
      await queryClient.invalidateQueries(`all-roles`);
      setAddRoleModalState(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="p-10 grid bg-white rounded-lg shadow-xl w-fit dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl dark:text-white">
                {t('users.roles.btn_add')}
              </h1>
            </div>
          </div>

          <input
            id="role"
            className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text"
            placeholder={t('users.table.role')}
          />
          <button
            type="submit"
            className="ml-4 w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          >
            {t('users.roles.btn_add')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoleModal;
