import React, { useState } from 'react';
import useDarkMode from 'use-dark-mode';
import frenchFlag from './../../assets/icons/frenchFlag.png';
import englishFlag from './../../assets/icons/englishFlag.png';
import i18n from 'i18next';
import '../../assets/css/header.css';

const Header: React.FC = () => {
  const darkMode = useDarkMode(false);

  const [language, setLanguage] = useState(
    i18n.language || window.localStorage.i18nextLng,
  );

  const toggleDarkMode = () => {
    const root = window.document.documentElement;
    if (darkMode.value) {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }

    darkMode.toggle();
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              >
                <svg
                  id="toggleSidebarMobileHamburger"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  id="toggleSidebarMobileClose"
                  className="w-6 h-6 hidden"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="text-xl font-bold flex items-center lg:ml-2.5">
                <img
                  src="https://demo.themesberg.com/windster/images/logo.svg"
                  className="h-6 mr-2"
                  alt="Windster Logo"
                />
                <span className="font-birthstone text-3xl dark:text-white self-center whitespace-nowrap">
                  FI-Sweets | Admin
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="group inline-block dark:bg-gray-800">
                <button className="dark:bg-gray-800 outline-none focus:outline-none px-3 py-1 bg-white rounded-sm flex items-center">
                  <span className="font-medium font-birthstone text-2xl p-2 block">
                    {language === 'fr-FR' ? (
                      <img
                        src={frenchFlag}
                        alt="French Flag"
                        style={{ width: '25px', height: '15px' }}
                      />
                    ) : (
                      <img
                        src={englishFlag}
                        alt="English Flag"
                        style={{ width: '25px', height: '15px' }}
                      />
                    )}
                  </span>
                  <span>
                    <svg
                      className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                </button>
                <ul className="bg-white dark:bg-gray-800 border rounded-lg transform scale-0 ml-1.5 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top">
                  <button>
                    {language !== 'fr-FR' && (
                      <li
                        className="rounded-sm px-3 py-1 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 font-birthstone text-2xl"
                        onClick={() => {
                          setLanguage('fr-FR');
                          i18n.changeLanguage('fr-FR');
                        }}
                      >
                        <img
                          src={frenchFlag}
                          alt="French Flag"
                          style={{ width: '25px', height: '15px' }}
                        />
                      </li>
                    )}
                    {language !== 'en-EN' && (
                      <li
                        className="rounded-sm px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-900 font-birthstone text-2xl"
                        onClick={() => {
                          setLanguage('en-EN');
                          i18n.changeLanguage('en-EN');
                        }}
                      >
                        <img
                          src={englishFlag}
                          alt="English Flag"
                          style={{ width: '25px', height: '15px' }}
                        />
                      </li>
                    )}
                  </button>
                </ul>
              </div>
              <button
                onClick={() => {
                  toggleDarkMode();
                }}
                className="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 dark:hover:text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Dark mode</span>
                {!darkMode.value ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
