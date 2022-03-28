import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <>
      <div className="sticky top-0 z-40 min-w-full h-24 container bg-beige-100 shadow">
        <div className="grid grid-cols-6 justify-between items-center h-full">
          <div />
          <div className="flex items-center -mt-8">
            <Link to="/">
              <div className="text-black">
                <p className="text-lg font-semibold text-4xl">{`FI-Sweets`}</p>
              </div>
            </Link>
          </div>

          <div className="z-50 col-start-4">
            <img
              className="object-cover -ml-16 w-32 h-32 rounded-full shadow"
              src="https://media.discordapp.net/attachments/548183152376545306/955953631805452349/logo.jpg"
              alt="logo"
            />
          </div>

          <div className="flex items-center justify-center -mt-8">
            <button className="bg-beige-100 text-black text-xs font-semibold px-4 py-2 rounded-full">
              <svg
                className="fill-current h-4 w-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
