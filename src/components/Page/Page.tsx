import React, { ReactElement } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface PageProps {
  children: React.ReactElement | ReactElement[];
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="min-h-screen min-w-screen">
      <Header />
      <Sidebar />
      <div
        id="main-content"
        className="h-full w-fit bg-gray-50 relative overflow-y-auto lg:ml-64"
      >
        <main className="pt-16 w-fit h-screen dark:bg-gray-600">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Page;
