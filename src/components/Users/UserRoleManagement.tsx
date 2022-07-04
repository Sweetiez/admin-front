import React, { useState } from 'react';
import Page from '../Page/Page';
import { Role } from '../../hooks/auth/access/Roles';
import AccessRoleController from '../Auth/AccessRoleController';
import { useTranslation } from 'react-i18next';
import RoleCard from './roles/RoleCard';
import Modal from '../utils/Modal';
import ModifyUserRolesModal from './roles/ModifyUserRolesModal';
import UserModel from './models/UserModel';

const UserRoleManagement: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<UserModel | undefined>();
  const [modifyUserRoles, setModifyUserRoles] = useState(false);

  function handleSearch(event: any) {
    event.preventDefault();
    console.log(event.target.email.value);

    // const response = new UserModel('', event.target.email.value, []);
    setUser(undefined);
    setModifyUserRoles(true);
  }

  return (
    <Page>
      <AccessRoleController redirect="/" role={Role.ADMIN} />
      <div className="bg-gray-100 dark:bg-gray-600">
        <div className="pt-4 flex justify-center">
          <div className="font-dark font-bold pt-4 align font-birthstone text-5xl dark:text-white">
            {t('users.title')}
          </div>
        </div>
        <div className="bg-gray-100 flex-auto items-center md:px-40 py-6 dark:bg-gray-600">
          <div className="flex justify-between ">
            <div className="font-dark font-bold pt-4 align font-birthstone text-5xl dark:text-white">
              {t('users.label_find')}
            </div>
          </div>
          <div className="flex justify-between">
            <form onSubmit={handleSearch}>
              <input
                id="email"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="email"
                placeholder={t('users.input_placeholder')}
              />
              <button
                type="submit"
                className="ml-4 w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
              >
                {t('users.btn_search')}
              </button>
            </form>
            <RoleCard />
          </div>
        </div>
        {user}
        {/*<table className="mt-4 2xl:row-start-2 col-start-2 2xl:col-start-2 col-end-8 2xl:col-end-5 h-40">*/}
        {/*  <thead>*/}
        {/*    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">*/}
        {/*      <th className="py-3 px-6 text-left">*/}
        {/*        {t('users.table.email')}*/}
        {/*      </th>*/}
        {/*      <th className="py-3 px-6 text-left">{t('users.table.role')}</th>*/}
        {/*      <th className="py-3 px-6 text-left">*/}
        {/*        {t('users.table.actions')}*/}
        {/*      </th>*/}
        {/*    </tr>*/}
        {/*  </thead>*/}
        {/*  <tbody>*/}
        {/*    <tr>*/}
        {/*      <td>zaeaz</td>*/}
        {/*      <td>zaeaz</td>*/}
        {/*      <td>zaeaz</td>*/}
        {/*    </tr>*/}
        {/*  </tbody>*/}
        {/*</table>*/}
      </div>
      <Modal
        modalContent={
          <ModifyUserRolesModal
            setModalState={setModifyUserRoles}
            user={user}
          />
        }
        modalState={modifyUserRoles}
        setModalState={() => setModifyUserRoles(false)}
      />
    </Page>
  );
};

export default UserRoleManagement;
