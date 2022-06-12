import React from 'react';
import StepModel from './models/StepModel';

interface StepCardProps {
  step: StepModel;
}

const StepCard: React.FC<StepCardProps> = ({ step }) => {
  return (
    <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
      <p className="text-xl font-black text-gray-800">{step.order}</p>
      <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
        <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <div className="py-2 px-4 bg-white rounded-b-lg dark:bg-gray-800">
            <textarea
              id="description"
              onChange={(e) => {
                step.description = e.target.value;
              }}
              onBlur={(e) => {
                console.log('ONBLUR' + step.description);
              }}
              className="block px-0 w-full text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              defaultValue={step.description}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
