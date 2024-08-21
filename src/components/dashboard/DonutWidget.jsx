import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FaTimes } from 'react-icons/fa';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DonutWidget = ({ title = '', data = [], labels = [], dotColors = [], onRemove }) => {
  const defaultColors = ['#FF6384', '#36A2EB', '#FFCE56'];
  const colors = dotColors.length > 0 ? dotColors : defaultColors;

  const chartData = {
    labels: labels.length > 0 ? labels : ['No Data'],
    datasets: [
      {
        data: data.length > 0 ? data : [100],
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
    cutout: '70%',
  };

  return (
    <div className="relative flex flex-col p-4 border shadow-sm rounded-lg bg-white h-56 group">
      {onRemove && (
        <FaTimes
          className="absolute top-2 right-2 text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={onRemove}
        />
      )}
      <div className="text-md font-semibold pl-3 mb-3">{title}</div>
      <div className="flex flex-row items-center justify-between space-x-10 flex-1">
        <div className="w-1/2 size-36 flex justify-center items-center">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-start space-y-2">
          {labels.length > 0 && labels.map((label, index) => (
            <div key={index} className="flex items-center space-x-1">
              <div
                className="w-4 h-4 rounded-full border border-gray-600"
                style={{ backgroundColor: colors[index] }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutWidget;
