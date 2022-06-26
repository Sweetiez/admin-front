import React, { useEffect, useMemo, useState } from 'react';
import { capitalizeFirstLetter } from '../../../hooks/utils/strings';
import { useTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { useQueryClient } from 'react-query';
import SweetModel from '../../Products/models/SweetModel';
import ProductModel from '../../Products/models/ProductModel';
import { useSweetById, useSweets } from '../../../hooks/sweets/sweetsHooks';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import CreateRewardRequest from '../../../hooks/rewards/requests/CreateRewardRequest';
import { createReward, updateReward } from '../../../hooks/rewards/rewardHooks';
import RewardModel from '../models/RewardModel';
import UpdateRewardRequest from '../../../hooks/rewards/requests/UpdateRewardRequest';

interface CreateRewardProps {
  reward?: RewardModel;
  setOpenedModal: (openedModal: boolean) => void;
}

const RewardForm: React.FC<CreateRewardProps> = ({
  reward,
  setOpenedModal,
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { addToast } = useToasts();
  const [quantity, setQuantity] = useState(1);
  const [searching, setSearching] = useState('');
  const [sweets, setSweets] = useState<SweetModel[]>([]);
  const [sweetSelected, setSweetSelected] = useState<ProductModel>();
  let { data: sweetData } = useSweets();
  const { data: sweet } = useSweetById(
    reward?.productId ? reward.productId : '',
  );
  const [formTitle, setFormTitle] = useState<string>(
    t('products.trays.add.title'),
  );
  const [nameDefaultValue, setNameDefaultValue] = useState<string>();
  const [costDefaultValue, setCostDefaultValue] = useState<number>();

  useEffect(() => {
    if (reward !== undefined) {
      setFormTitle(t('rewards.edit.title'));
      setNameDefaultValue(reward.name);
      setCostDefaultValue(reward?.cost ? reward.cost : -1);
      setSweets([
        new SweetModel(sweet?.id, 1, sweet?.name, sweet?.unitPerPackage),
      ]);
    }
  }, [reward, sweet, t]);

  let sweetPublished = useMemo(
    () => sweetData?.filter((sweet) => sweet.status === 'PUBLISHED'),
    [sweetData],
  );

  const sweetsFiltered = useMemo(() => {
    let data = sweetPublished;
    sweets.forEach((s) => (data = data?.filter((sp) => sp.id !== s.sweetId)));
    return data;
  }, [sweetPublished, sweets]);

  const addSweet = () => {
    if (sweetSelected) {
      let sweetItem = {
        sweetId: sweetSelected?.id,
        quantity: quantity,
        name: sweetSelected?.name,
        unitPerPackage: sweetSelected?.unitPerPackage,
      };
      const existing = sweets.find((s) => s.sweetId === sweetSelected?.id);
      if (existing) {
        existing.quantity
          ? (existing.quantity += quantity)
          : (existing.quantity = quantity);
        setSweets([...sweets]);
      } else {
        setSweets([...sweets, sweetItem]);
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
    setSweets(sweets.filter((s) => s.sweetId !== id));
  };

  const submitRewardCreation = async (event: any) => {
    event.preventDefault();
    const name = capitalizeFirstLetter(event.target.name.value);
    const price = event.target.cost.value;

    if (name === '' || price === '' || sweets.length < 1) {
      addToast(`${t('products.trays.add.alert_failed_empty')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    const sweetId = sweets[0]?.sweetId ? sweets[0].sweetId : '';

    const request = new CreateRewardRequest(name, price, sweetId, 'SWEET');

    try {
      await createReward(request);
      await queryClient.invalidateQueries(`rewards`);
      addToast(`${t('rewards.create.alert_success')}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      setOpenedModal(false);
    } catch (e) {
      addToast(`${t('rewards.create.alert_failed')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const submitRewardUpdate = async (event: any) => {
    event.preventDefault();
    const name = capitalizeFirstLetter(event.target.name.value);
    const price = event.target.cost.value;

    if (name === '' || price === '' || sweets.length < 1) {
      addToast(`${t('products.trays.add.alert_failed_empty')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    const sweetId = sweets[0]?.sweetId ? sweets[0].sweetId : '';

    const request = new UpdateRewardRequest(
      reward?.id ? reward.id : '',
      name,
      price,
      sweetId,
      'SWEET',
      reward?.state ? reward.state : '',
    );

    try {
      await updateReward(request);
      await queryClient.invalidateQueries(`rewards`);
      addToast(`${t('rewards.edit.alert_success')}`, {
        appearance: 'success',
        autoDismiss: true,
      });
      setOpenedModal(false);
    } catch (e) {
      addToast(`${t('rewards.edit.alert_failed')}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
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

        <form
          onSubmit={
            reward !== undefined ? submitRewardUpdate : submitRewardCreation
          }
        >
          <div className="flex justify-center">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
                {formTitle}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              {t('rewards.create.name')}
            </label>
            <input
              id="name"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('rewards.create.name')}
              defaultValue={nameDefaultValue}
            />
          </div>

          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              {t('rewards.create.cost')}
            </label>
            <input
              id="cost"
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              placeholder={t('rewards.create.cost')}
              defaultValue={costDefaultValue}
            />
          </div>

          <div className="grid mb-3 grid-cols-1 md:grid-cols-4 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1 col-span-3">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                {t('rewards.create.products')}
              </label>
            </div>
          </div>
          {sweets.length <= 0 && (
            <div className="grid mb-3 grid-cols-1 md:grid-cols-4 gap-5 md:gap-8 mt-5 mx-7">
              <div className="grid grid-cols-1 col-span-3">
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
          )}

          {sweets.length > 0 && (
            <div className="grid px-4 grid-cols-1 mt-1 mx-7 overflow-auto max-h-36 rounded-lg border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ">
              {sweets.map((sweet) => (
                <div
                  className="flex items-center justify-between my-1"
                  key={sweet.sweetId}
                >
                  <div>
                    <span>
                      {sweet.name}{' '}
                      {t('products.setOf', {
                        unitPerPackage: sweet.unitPerPackage,
                      })}{' '}
                    </span>
                  </div>

                  <span
                    className="ml-1"
                    onClick={() =>
                      sweet.sweetId && handleDeleteSweet(sweet.sweetId)
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
              value={reward ? t('rewards.edit.button') : t('products.save_btn')}
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RewardForm;
