import ProductModelRow from './models/ProductModelRow';
import React, { useState } from 'react';
import Modal from '../utils/Modal';
import ModifySweet from './Sweets/ModifySweet';
import ModifyTray from './Trays/ModifyTray';
import PublishProductModal from "./PublishProductModal";
import UnPublishProductModal from "./UnPublishProductModal";

interface ProductRowProps {
  _id: number;
  product: ProductModelRow;
  isTray: boolean;
}
const ProductTableRow: React.FC<ProductRowProps> = ({
  _id,
  product,
  isTray,
}) => {
  const [modifySweetModalState, setModifySweetModalState] = useState(false);
  const [modifyTrayModalState, setModifyTrayModalState] = useState(false);
  const [publishProductModalState, setPublishProductModalState] = useState(false);
  const [unPublishProductModalState, setUnPublishProductModalState] = useState(false);

  const lineColor = `border-b border-gray-200 ${
    _id % 2 === 0 ? 'dark:bg-gray-100' : 'dark:bg-gray-300 bg-gray-50'
  } hover:bg-gray-100`;

  let statusStyle: string;
  switch (product.status) {
    case 'PUBLISHED':
      statusStyle = 'bg-green-200 text-green-600';
      break;
    case 'CREATED':
      statusStyle = 'bg-indigo-200 text-indigo-600';
      break;
    case 'DELETED':
      statusStyle = 'bg-red-200 text-red-600';
      break;
    default:
      statusStyle = 'bg-brown-200 text-brown-600';
  }

  const isPublished = product.status === 'PUBLISHED';

  const publishSVG = (
    <svg
      fill="#FFF"
      height="18"
      viewBox="0 0 24 24"
      width="18"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </svg>
  );

  const unpublishedSVG = (
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="18px"
      height="18px"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
    >
      <polygon
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeMiterlimit="10"
        points="44,18 54,18 54,63 10,63 10,18 20,18 "
      />
      <line
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="39"
        y1="49"
        x2="25"
        y2="35"
      />
      <line
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="25"
        y1="49"
        x2="39"
        y2="35"
      />
      <path
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M22,24V11c0-5.523,4.477-10,10-10s10,4.477,10,10v13"
      />
    </svg>
  );

  return (
    <>
      <tr className={lineColor}>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span className="font-medium">{product.name}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span>{product.price} €</span>
          </div>
        </td>
        {!isTray && (
          <td className="py-3 px-6 text-left">
            <div className="flex items-center justify-center">
              <span>{product.unitPerPackage}</span>
            </div>
          </td>
        )}
        <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center">
            <span>{product.highlight}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <span className={`${statusStyle} py-1 px-3 rounded-full text-xs`}>
            {product.status}
          </span>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            <div
              onClick={() =>
                isTray
                  ? setModifyTrayModalState(true)
                  : setModifySweetModalState(true)
              }
              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <div
              onClick={
                isPublished
                  ?  () => setUnPublishProductModalState(true)
                  : () => setPublishProductModalState(true)
              }
              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
            >
              {isPublished ? unpublishedSVG : publishSVG}
            </div>
          </div>
        </td>
      </tr>
      <Modal
        modalContent={
          <ModifySweet
            product={product}
            setOpenedModal={setModifySweetModalState}
          />
        }
        modalState={modifySweetModalState}
        setModalState={() => setModifySweetModalState(false)}
      />
      <Modal
        modalContent={
          <ModifyTray
            product={product}
            setOpenedModal={setModifyTrayModalState}
          />
        }
        modalState={modifyTrayModalState}
        setModalState={() => setModifyTrayModalState(false)}
        persistent={true}
      />
      <Modal
        modalContent={
          <PublishProductModal
            product={product}
            setOpenedModal={setPublishProductModalState}
            productType={isTray ? 'trays' : 'sweets'}
          />
        }
        modalState={publishProductModalState}
        setModalState={() => setPublishProductModalState(false)}
      />
      <Modal
        modalContent={
          <UnPublishProductModal
            product={product}
            setOpenedModal={setUnPublishProductModalState}
            productType={isTray ? 'trays' : 'sweets'}
          />
        }
        modalState={unPublishProductModalState}
        setModalState={() => setUnPublishProductModalState(false)}
      />
    </>
  );
};

export default ProductTableRow;
