import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoles } from '../../../hooks/users/roleHooks';
import Select from 'react-dropdown-select';
import UserModel from '../models/UserModel';

interface ModifyUserRolesModalProps {
  user: UserModel | undefined;
  setModalState: (state: boolean) => void;
}
const ModifyUserRolesModal: React.FC<ModifyUserRolesModalProps> = ({
  user,
  setModalState,
}) => {
  const { t } = useTranslation();
  // const queryClient = useQueryClient();
  const { data: roles } = useRoles();
  const [rolesUpdated, setRolesUpdated] = useState<any>([]);

  const roleOptions = roles
    ? roles.map((role: any) => ({
        value: role.id ? role.id : '0',
        label: role.name ? role.name : '',
      }))
    : [];

  async function handleSubmit(event: any) {
    event.preventDefault();

    console.log(rolesUpdated);
    setModalState(false);
  }

  return (
    <div className="overflow-x-auto">
      <div className="p-10 grid bg-white rounded-lg shadow-xl w-fit dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl dark:text-white">
                {t('users.roles.update_label', {
                  email: user?.email ? user.email : '',
                })}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('users.roles.roles')}
            </label>
            {roleOptions && (
              <Select
                multi
                values={[]}
                options={roleOptions}
                color={'#8b5cf6'}
                onChange={(values) => setRolesUpdated(values)}
                name="select"
                dropdownHeight={'150px'}
              />
            )}
          </div>
          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button
              type="button"
              onClick={() => {
                setModalState(false);
              }}
              className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              {t('products.cancel_btn')}
            </button>
            <input
              type="submit"
              value={t('users.roles.update_btn')}
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default ModifyUserRolesModal;
