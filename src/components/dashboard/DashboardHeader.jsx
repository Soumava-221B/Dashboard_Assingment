import React, { useState } from "react";
import { FaClock, FaEllipsisV, FaPlus, FaChevronDown } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";

const DashboardHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="px-8 py-4 flex items-center justify-between w-full">
      <span className="text-lg font-bold text-zinc-800">CNAPP Dashboard</span>

      <div className="space-x-3 flex">
        <button className="flex px-3 py-1 bg-gray-50 border border-zinc-500 rounded-md">
          Add Widget
          <FaPlus className="ml-3 mt-1 text-zinc-800" />
        </button>
        <button className="flex px-3 py-1 bg-gray-50 border border-zinc-500 rounded-md">
          <FaArrowsRotate className="mt-1 text-zinc-800" />
        </button>
        <button className="flex px-3 py-1 bg-gray-50 border border-zinc-500 rounded-md">
          <FaEllipsisV className="mt-1 text-zinc-800" />
        </button>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center px-3 py-1 bg-gray-50 border border-blue-900 rounded-md focus:outline-none"
            aria-expanded={isDropdownOpen}
            aria-controls="time-range-dropdown"
          >
            <FaClock className="mr-2 text-blue-900" />
            <span className="w-px h-5 bg-blue-900 mx-2"></span>
            <span className="text-blue-900">Last 3 Days</span>
            <FaChevronDown className="ml-2 text-blue-900" />
          </button>
          {isDropdownOpen && (
            <ul
              id="time-range-dropdown"
              className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg text-sm text-gray-800"
            >
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Today</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Yesterday</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Last 3 Days</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">5 Days</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Week</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Month</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;