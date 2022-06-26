import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RoleRenderBasedAccess from '../Auth/RoleRenderBasedAccess';
import { Role } from '../../hooks/auth/access/Roles';
import { logout } from '../../hooks/auth/access/access';
import { useToasts } from 'react-toast-notifications';
import { useReports } from '../../hooks/reports/reportsHooks';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  let { data: reports } = useReports();

  function handleLogout() {
    logout();
    addToast(t('logout.success'), { appearance: 'success', autoDismiss: true });
    navigate('/');
  }

  return (
    <>
      <div className="flex overflow-hidden dark:bg-gray-800 bg-white ">
        <aside
          id="sidebar"
          className="fixed hidden pt-12 z-20 h-full top-0 left-0  flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
          aria-label="Sidebar"
        >
          <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:bg-gray-800 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 dark:bg-gray-800 bg-white divide-y space-y-1">
                <ul className="space-y-2 pb-2">
                  <li>
                    <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 dark:hover:bg-indigo-500 group">
                      <svg
                        className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                      </svg>
                      <span className="ml-3">{t('navigation.dashboard')}</span>
                    </div>
                  </li>
                  <li>
                    <Link to="/admin/orders">
                      <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center dark:hover:bg-indigo-500 p-2">
                        <svg
                          className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                        <span className="ml-3">{t('navigation.orders')}</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/sweets">
                      <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 dark:hover:bg-indigo-500 group ">
                        <svg
                          className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          {t('navigation.sweets')}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/trays">
                      <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 dark:hover:bg-indigo-500 group ">
                        <svg
                          className="h-6 w-6 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          {t('navigation.trays')}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <RoleRenderBasedAccess role={Role.ADMIN}>
                      <Link to="/admin/rewards">
                        <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center dark:hover:bg-indigo-500 p-2">
                          <svg
                            className="w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="gem"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                            />
                          </svg>
                          <span className="ml-4">
                            {t('navigation.rewards')}
                          </span>
                        </div>
                      </Link>
                    </RoleRenderBasedAccess>
                  </li>
                  <li>
                    <RoleRenderBasedAccess role={Role.ADMIN}>
                      <Link to="/admin/recipes">
                        <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 dark:hover:bg-indigo-500 group ">
                          <svg
                            className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-3 flex-1 whitespace-nowrap">
                            {t('navigation.recipe')}
                          </span>
                        </div>
                      </Link>
                    </RoleRenderBasedAccess>
                  </li>
                  <li>
                    <Link to="/admin/reports">
                      <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center dark:hover:bg-indigo-500 p-2">
                        <svg
                          className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          {t('navigation.report')}
                        </span>
                        {reports?.length !== 0 ? (
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                            {reports?.length}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Link>
                  </li>
                  {/*<li>*/}
                  {/*  <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 dark:hover:bg-indigo-500 group ">*/}
                  {/*    <svg*/}
                  {/*      className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"*/}
                  {/*      fill="currentColor"*/}
                  {/*      viewBox="0 0 20 20"*/}
                  {/*      xmlns="http://www.w3.org/2000/svg"*/}
                  {/*    >*/}
                  {/*      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />*/}
                  {/*    </svg>*/}
                  {/*    <span className="ml-3 flex-1 whitespace-nowrap">*/}
                  {/*      Kanban*/}
                  {/*    </span>*/}
                  {/*    <span className="bg-gray-200 text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">*/}
                  {/*      Pro*/}
                  {/*    </span>*/}
                  {/*  </div>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 dark:hover:bg-indigo-500 group ">*/}
                  {/*    <svg*/}
                  {/*      className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"*/}
                  {/*      fill="currentColor"*/}
                  {/*      viewBox="0 0 20 20"*/}
                  {/*      xmlns="http://www.w3.org/2000/svg"*/}
                  {/*    >*/}
                  {/*      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />*/}
                  {/*      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />*/}
                  {/*    </svg>*/}
                  {/*    <span className="ml-3 flex-1 whitespace-nowrap">*/}
                  {/*      Inbox*/}
                  {/*    </span>*/}
                  {/*    <span className="bg-gray-200 text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">*/}
                  {/*      Pro*/}
                  {/*    </span>*/}
                  {/*  </div>*/}
                  {/*</li>*/}
                  <li>
                    <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 dark:hover:bg-indigo-500 group ">
                      <svg
                        className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        Users
                      </span>
                    </div>
                  </li>
                </ul>
                <div className="space-y-2 pt-2">
                  <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center dark:hover:bg-indigo-500 p-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 dark:hover:bg-indigo-500 group "
                    >
                      <svg
                        className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        {t('navigation.logout')}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
