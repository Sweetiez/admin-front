import React, { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from '../../../hooks/utils/strings';
import '../../../assets/css/_dropdown-select.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useSweets } from '../../../hooks/sweets/sweetsHooks';
import ProductModel from '../models/ProductModel';
import SweetModel from '../models/SweetModel';
import { updateTray, useTrayById } from '../../../hooks/trays/traysHooks';
import ProductModelRow from '../models/ProductModelRow';
import DeleteImageRequest from '../../../hooks/sweets/requests/DeleteImageRequest';
import SweetTrayModel from '../models/SweetTrayModel';
import UpdateTrayRequest from '../../../hooks/trays/requests/UpdateTrayRequest';
import {
  deleteProductImage,
  uploadProductImage,
} from '../../../hooks/products/productsHooks';

interface ModifyTrayProps {
  product: ProductModelRow;
  setOpenedModal: (openedModal: boolean) => void;
}
const ModifyTray: React.FC<ModifyTrayProps> = ({ setOpenedModal, product }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();
  const {
    isLoading: isTrayLoading,
    isError: isTrayError,
    data: trayData,
    error,
  } = useTrayById(product.id ? product.id : '');

  const [quantity, setQuantity] = useState(1);
  const [searching, setSearching] = useState('');

  const [sweets, setSweets] = useState<SweetTrayModel[]>([]);

  useEffect(() => {
    if (trayData && trayData.sweets) {
      setSweets(trayData.sweets);
    }
  }, [trayData]);

  const [sweetSelected, setSweetSelected] = useState<ProductModel>();
  let { data: sweetData } = useSweets();

  let sweetPublished = useMemo(
    () => sweetData?.filter((sweet) => sweet.status === 'PUBLISHED'),
    [sweetData],
  );

  const sweetsFiltered = useMemo(() => {
    let data = sweetPublished;
    sweets?.forEach(
      (s) => (data = data?.filter((sp) => sp.id !== s.sweet?.id)),
    );
    return data;
  }, [sweetPublished, sweets]);

  if (isTrayLoading) return <div>Loading...</div>;

  if (isTrayError) {
    addToast(error.message, { appearance: 'error', autoDismiss: true });
    return <div>Error...</div>;
  }

  const addSweet = () => {
    if (sweetSelected) {
      let sweetItem = {
        quantity: quantity,
        sweet: {
          ...sweetSelected,
          quantity: quantity,
        },
      };
      if (sweets) {
        const existing = sweets.find((s) => s.sweet?.id === sweetSelected?.id);
        if (existing) {
          existing.quantity
            ? (existing.quantity += quantity)
            : (existing.quantity = quantity);
          setSweets([...sweets]);
        } else {
          setSweets([...sweets, sweetItem]);
        }
      }

      setQuantity(1);
      setSweetSelected(undefined);
      setSearching('');
    }
  };

  const handleOnSelect = (item: any) => {
    setSweetSelected(item);
  };

  const handleOnClear = () => {
    setSweetSelected(undefined);
  };

  const handleDeleteSweet = (id: string) => {
    setSweets(sweets?.filter((s) => s.sweet?.id !== id));
  };

  const handelQuantity = (value: number) => {
    if (value < 1) value = 1;
    setQuantity(value);
  };

  const handelItemQuantity = (id: string, value: number) => {
    if (value < 1) value = 1;
    if (sweets) {
      const existing = sweets.find((s) => s.sweet?.id === id);
      if (existing) {
        existing.quantity = value;
        setSweets([...sweets]);
      }
    }
  };

  const submitTrayModification = async (event: any) => {
    event.preventDefault();
    const name = capitalizeFirstLetter(event.target.name.value);
    const price = event.target.price.value;
    const flavor = event.target.flavor.value;
    const highlight = event.target.highlight.value;
    const description = capitalizeFirstLetter(event.target.description.value);

    if (
      name === '' ||
      price === '' ||
      flavor === '' ||
      highlight === '' ||
      description === '' ||
      (sweets && sweets.length < 1)
    ) {
      addToast(`${t('products.add.alert_failed_empty')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    const sweetsRequestData: SweetModel[] = [];

    sweets.forEach((s) => {
      sweetsRequestData.push({
        sweetId: s.sweet?.id,
        quantity: s.quantity,
        name: undefined,
        unitPerPackage: undefined,
      });
    });

    const request = new UpdateTrayRequest(
      trayData?.id,
      name,
      Number(price),
      description,
      trayData?.images,
      sweetsRequestData,
      highlight || trayData?.highlight,
      trayData?.state,
      flavor || trayData?.flavor,
      trayData?.rating,
    );

    try {
      await updateTray(request);
      await queryClient.invalidateQueries(`all-trays`);
      await queryClient.invalidateQueries(`tray-${trayData?.id}`);
      addToast(`${t('products.trays.update.alert_success')}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      setOpenedModal(false);
    } catch (e) {
      addToast(`${t('products.trays.update.alert_failed')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  async function onSubmitUploadFile(event: any) {
    event.preventDefault();

    if (!trayData) {
      return null;
    }

    await uploadProductImage(
      trayData.id ? trayData.id : '',
      event.target.files[0],
      'trays',
    );

    await queryClient.invalidateQueries(`tray-${trayData.id}`);
    addToast(`${t('products.alert_img_upload')}`, {
      appearance: 'success',
      autoDismiss: true,
    });
  }

  async function onDeleteImage(id: string, url: string) {
    const request = new DeleteImageRequest(url);
    const response = await deleteProductImage(id, request, 'trays');
    if (response) {
      await queryClient.invalidateQueries(`all-trays`);
      await queryClient.invalidateQueries(`tray-${id}`);
      addToast(`${t('products.alert_img_delete')}`, {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      addToast(`${t('products.update.alert_failed')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="grid bg-white rounded-lg shadow-xl w-fit dark:bg-gray-800">
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

        <form onSubmit={submitTrayModification}>
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl dark:text-white">
                {t('products.trays.update.title')}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('products.name')}
            </label>
            <input
              id="name"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('products.name')}
              defaultValue={trayData?.name}
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('products.flavor')}
            </label>
            <select
              id="flavor"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              defaultValue={trayData?.flavor}
            >
              <option value="SALTY">{t('products.flavors.SALTY')}</option>
              <option value="SWEET">{t('products.flavors.SWEET')}</option>
              <option value="MIXED">{t('products.flavors.MIXED')}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('products.highlight')}
            </label>
            <select
              id="highlight"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              defaultValue={trayData?.highlight}
            >
              <option value="COMMON">{t('products.highlights.common')}</option>
              <option value="PROMOTED">{t('products.highlights.promoted')}</option>
              <option value="BANNER">{t('products.highlights.banner')}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('products.price')}
            </label>
            <input
              id="price"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('products.price')}
              defaultValue={trayData?.price}
            />
          </div>

          <div className="grid mb-3 grid-cols-1 md:grid-cols-4 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1 col-span-2">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
                {t('products.sweetsInput')}
              </label>
              <ReactSearchAutocomplete
                items={sweetsFiltered}
                fuseOptions={{ keys: ['name'] }}
                resultStringKeyName="name"
                onSelect={handleOnSelect}
                onClear={handleOnClear}
                onSearch={(value: string) => setSearching(value)}
                inputSearchString={searching}
                showIcon={false}
                placeholder={t('products.search')}
                styling={{
                  height: '39px',
                  border:
                    '2px solid rgba(196, 181, 253, var(--tw-border-opacity))',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  boxShadow: 'none',
                  hoverBackgroundColor: '#d8b4fe',
                  fontSize: '16px',
                  iconColor: '#d8b4fe',
                  lineColor: '#c084fc',
                  clearIconMargin: '3px 8px 0 0',
                  zIndex: 2,
                }}
              />
            </div>

            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
                {t('products.quantity')}
              </label>
              <input
                id="unitPerPackage"
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="number"
                value={quantity}
                onChange={(value) => handelQuantity(Number(value.target.value))}
                placeholder={t('products.quantity')}
              />
            </div>

            <div className="grid grid-cols-1 pt-6">
              <button
                type="button"
                onClick={() => {
                  addSweet();
                }}
                className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
              >
                {t('products.add')}
              </button>
            </div>
          </div>

          {sweets && sweets.length > 0 && (
            <div className="grid px-4 grid-cols-1 mt-1 mx-7 overflow-auto max-h-36 rounded-lg border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ">
              {sweets.map((sweet) => (
                <div
                  className="flex items-center justify-between my-1"
                  key={sweet.sweet?.id}
                >
                  <div>
                    <span className="dark:text-white">
                      {sweet?.sweet?.name}{' '}
                      {t('products.setOf', {
                        unitPerPackage: sweet?.sweet?.unitPerPackage,
                      })}{' '}
                      ??
                    </span>

                    <input
                      id="unitPerPackageItem"
                      className="mx-1 w-16 h-8 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      type="number"
                      value={sweet.quantity}
                      onChange={(value) =>
                        sweet.sweet?.id &&
                        handelItemQuantity(
                          sweet.sweet?.id,
                          Number(value.target.value),
                        )
                      }
                      placeholder={t('products.quantity')}
                    />
                  </div>

                  <span
                    className="ml-1"
                    onClick={() =>
                      sweet.sweet?.id && handleDeleteSweet(sweet.sweet?.id)
                    }
                  >
                    <svg
                      className="mt-0.5 ml-0.5 w-4 h-4 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold dark:text-white">
              {t('products.description')}
            </label>
            <input
              id="description"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('products.description')}
              defaultValue={trayData?.description}
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
              {t('products.img_upload_title')}
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider dark:text-white">
                    {t('products.img_upload_description')}
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={onSubmitUploadFile}
                />
              </label>
            </div>
            <div className="flex pt-3">
              {trayData?.images?.map((image, index) => {
                let component;
                if (image !== '') {
                  component = (
                    <div className="mr-3 w-16 h-16" key={index}>
                      <button
                        type="button"
                        onClick={() =>
                          onDeleteImage(trayData?.id ? trayData?.id : '', image)
                        }
                        className="absolute w-5 h-5 bg-red-500"
                      >
                        <svg
                          className="mt-0.5 ml-0.5 w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                      <img src={image} alt="thumbnail" />
                    </div>
                  );
                } else {
                  component = <span key={index}></span>;
                }
                return component;
              })}
            </div>
          </div>

          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <button
              type="button"
              onClick={() => {
                setOpenedModal(false);
              }}
              className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              {t('products.cancel_btn')}
            </button>
            <input
              type="submit"
              value={t('products.modify_btn')}
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyTray;
