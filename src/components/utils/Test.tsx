import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, ReactComponentElement } from 'react';

interface TestProps {
  modalContent: ReactComponentElement<any>;
  modalState: boolean;
  setModalState: () => void;
}

const Test: React.FC<TestProps> = ({
  modalContent,
  modalState,
  setModalState,
}) => {
    setTimeout(() => {
        setModalState()
    }, 500);


  return (
    <>
      <Transition.Root show={modalState} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-50 inset-0 overflow-y-auto"
          onClose={setModalState}
        >
          <div className="flex items-end justify-center min-h-screen w-fit pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-transparent bg-opacity-100 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter=""
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave=""
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className=" inline-block align-center bg-transparent text-left overflow-hidden sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="flex justify-center">
                    {modalContent}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Test;
