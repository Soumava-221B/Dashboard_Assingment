import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ProgressBarWidget = ({ title = '', data = [], labels = [], colors = [], onRemove }) => {
  const total = data.reduce((acc, value) => acc + value, 0);

  return (
    <div className="relative flex flex-col p-4 border shadow-sm rounded-lg bg-white h-56 group">
      {onRemove && (
        <FaTimes
          className="absolute top-2 right-2 text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={onRemove}
        />
      )}
      <div className="text-md font-semibold pl-3 mb-3">{title}</div>
      <div className="flex flex-col justify-center items-center space-y-2 flex-1">
        <div className="w-full bg-gray-200 rounded-full overflow-hidden h-4">
          <div className="flex h-full">
            {data.map((value, index) => {
              const percentage = (value / total) * 100;
              return (
                <div
                  key={index}
                  className="h-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: colors[index] || '#ccc',
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 px-10 pt-5">
          {labels.length > 0 && labels.map((label, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div
                className="w-6 h-4 rounded-md"
                style={{ backgroundColor: colors[index] || '#ccc' }}
              />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBarWidget;