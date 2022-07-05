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
                    <Link to="/admin">
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
                        <span className="ml-3">
                          {t('navigation.dashboard')}
                        </span>
                      </div>
                    </Link>
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
                    <Link to="/admin/ingredients">
                      <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 dark:hover:bg-indigo-500 group">
                        <svg
                          version="1.1"
                          id="Capa_1"
                          x="0px"
                          y="0px"
                          className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                          viewBox="0 0 968.075 968.075"
                          fill="currentColor"
                        >
                          <g>
                            <g>
                              <path
                                d="M192.474,436.9c-36.8,36-59.6,86.3-59.6,141.899c0,55.5,22.8,105.801,59.6,141.801c8.101,8,21.2,8,29.301,0
			c36.8-36,59.6-86.301,59.6-141.801c0-55.6-22.9-105.8-59.6-141.8C213.674,428.9,200.575,428.9,192.474,436.9z"
                              />
                              <path
                                d="M389.775,687.101c-55.5,0-105.801,22.8-141.801,59.6c-8,8.1-8,21.2,0,29.3c36.101,36.8,86.301,59.601,141.801,59.601
			c55.6,0,105.8-22.801,141.899-59.601c8-8.2,8-21.2,0-29.3C495.475,709.9,445.275,687.101,389.775,687.101z"
                              />
                              <path
                                d="M335.975,293.4c-36.801,36-59.601,86.3-59.601,141.899c0,55.5,22.8,105.801,59.601,141.801c8.1,8,21.199,8,29.3,0
			c36.8-36,59.6-86.301,59.6-141.801c0-55.6-22.899-105.8-59.6-141.8C357.174,285.4,344.075,285.4,335.975,293.4z"
                              />
                              <path
                                d="M675.075,603.2c-36.1-36.8-86.3-59.6-141.8-59.6s-105.8,22.8-141.8,59.6c-8,8.1-8,21.2,0,29.3
			c36.1,36.8,86.3,59.601,141.8,59.601c55.6,0,105.8-22.801,141.899-59.601C683.075,624.4,683.075,611.4,675.075,603.2z"
                              />
                              <path
                                d="M508.775,150c-8.101-8-21.2-8-29.3,0c-36.801,36-59.601,86.301-59.601,141.9c0,55.5,22.8,105.8,59.601,141.8
			c8.1,8,21.199,8,29.3,0c36.8-36,59.6-86.3,59.6-141.8C568.375,236.2,545.575,186,508.775,150z"
                              />
                              <path
                                d="M676.674,400.101c-55.5,0-105.8,22.8-141.8,59.6c-8,8.1-8,21.2,0,29.3c36.101,36.8,86.3,59.601,141.8,59.601
			c55.601,0,105.801-22.801,141.9-59.601c8-8.2,8-21.2,0-29.3C782.475,423,732.275,400.101,676.674,400.101z"
                              />
                              <path
                                d="M652.275,6.5c-8.101-8-21.2-8-29.3,0c-36.801,36-59.601,86.301-59.601,141.9c0,55.5,22.8,105.8,59.601,141.8
			c8.1,8,21.199,8,29.3,0c36.8-36,59.6-86.3,59.6-141.8C711.875,92.801,688.975,42.5,652.275,6.5z"
                              />
                              <path
                                d="M820.174,256.601c-55.5,0-105.8,22.8-141.8,59.6c-8,8.101-8,21.2,0,29.3c36.101,36.801,86.3,59.601,141.8,59.601
			c55.601,0,105.801-22.8,141.9-59.601c8-8.199,8-21.199,0-29.3C925.975,279.5,875.775,256.7,820.174,256.601z"
                              />
                              <path
                                d="M801.575,61.801c-39.3,39.3-58.6,90.899-58.1,142.5c0.1,11.399,9.3,20.6,20.699,20.699c51.5,0.5,103.2-18.8,142.5-58.1
			c39.301-39.3,58.601-91,58.101-142.5c-0.101-11.4-9.3-20.6-20.7-20.7C892.575,3.2,840.875,22.5,801.575,61.801z"
                              />
                              <path
                                d="M21.474,958.8c11.7,11.7,30.7,11.7,42.4,0l137.7-137.699c11.7-11.7,11.7-30.7,0-42.4l-12.7-12.7
			c-11.7-11.7-30.7-11.7-42.4,0L8.775,903.601c-11.7,11.699-11.7,30.699,0,42.399L21.474,958.8z"
                              />
                            </g>
                          </g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                          <g></g>
                        </svg>

                        <span className="ml-3 flex-1 whitespace-nowrap">
                          {t('navigation.ingredients')}
                        </span>
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
                  <li>
                    <Link to="/admin/events">
                      <div className="text-base text-gray-900 dark:text-white font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 dark:hover:bg-indigo-500 group ">
                        <svg
                          className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          {t('navigation.events')}
                        </span>
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
                    <Link to="/admin/users">
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
                        {t('navigation.users')}
                      </span>
                    </div>
                    </Link>
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
