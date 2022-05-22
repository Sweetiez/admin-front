import React from 'react';
import CreateSweetRequest from '../../hooks/sweets/requests/CreateSweetRequest';
import { useMutation } from 'react-query';
import { createSweet } from '../../hooks/sweets/sweetsHooks';
import ProductModelRow from './ProductModelRow';
import { useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';

interface CreateProductProps {
  setOpenedModal: (openedModal: boolean) => void;
}
const CreateProduct: React.FC<CreateProductProps> = ({ setOpenedModal }) => {
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  const { mutate } = useMutation(createSweet, {
    onSuccess: async (data: ProductModelRow) => {
      addToast(`Sweet ${data.name} created successfully`, {
        appearance: 'success',
        autoDismiss: true,
      });
      await queryClient.invalidateQueries('all-sweets');
      setOpenedModal(false);
    },
    onError: (err: any) => {
      addToast(err.message, { appearance: 'error', autoDismiss: true });
    },
  });

  const submitSweetCreation = async (event: any) => {
    event.preventDefault();
    const name = event.target.name.value;
    const price = event.target.price.value;
    const flavor = event.target.flavor.value;
    const description = event.target.description.value;

    if (name === '' || price === '' || flavor === '' || description === '') {
      addToast('Please fill out all fields', {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    const request = new CreateSweetRequest(
      name,
      Number(price),
      [],
      description,
      flavor,
    );

    mutate(request);
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid bg-white rounded-lg shadow-xl w-fit">
        <div className="flex justify-center py-4">
          <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
        </div>

        <form onSubmit={submitSweetCreation}>
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
                Product creation
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Name
            </label>
            <input
              id="name"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder="Name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Price
              </label>
              <input
                id="price"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                placeholder="Price"
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Flavor
              </label>
              <select
                id="flavor"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                <option>SALTY</option>
                <option>SWEET</option>
                <option>MIXED</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Description
            </label>
            <input
              id="description"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder="Description"
            />
          </div>

          {/*<div className="grid grid-cols-1 mt-5 mx-7">*/}
          {/*  <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">*/}
          {/*    Upload Photo*/}
          {/*  </label>*/}
          {/*  <div className="flex items-center justify-center w-full">*/}
          {/*    <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">*/}
          {/*      <div className="flex flex-col items-center justify-center pt-7">*/}
          {/*        <svg*/}
          {/*          className="w-10 h-10 text-purple-400 group-hover:text-purple-600"*/}
          {/*          fill="none"*/}
          {/*          stroke="currentColor"*/}
          {/*          viewBox="0 0 24 24"*/}
          {/*          xmlns="http://www.w3.org/2000/svg"*/}
          {/*        >*/}
          {/*          <path*/}
          {/*            strokeLinecap="round"*/}
          {/*            strokeLinejoin="round"*/}
          {/*            strokeWidth="2"*/}
          {/*            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"*/}
          {/*          />*/}
          {/*        </svg>*/}
          {/*        <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">*/}
          {/*          Select a photo*/}
          {/*        </p>*/}
          {/*      </div>*/}
          {/*      <input type="file" className="hidden" />*/}
          {/*    </label>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button
              onClick={() => {
                setOpenedModal(false);
              }}
              className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Cancel
            </button>
            <input
              type="submit"
              value="Create"
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
