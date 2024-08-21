import React, { useState } from "react";
import { FaSearch, FaChevronDown, FaBell, FaUser } from "react-icons/fa";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); 
  };

  return (
    <div className="bg-white py-3 px-8 flex justify-between items-center border-b border-zinc-300 shadow-md">
      <div className="flex items-center space-x-2 text-gray-700 text-[12px]">
        <span>Home</span>
        <span className="text-gray-500">{">"}</span>
        <span className="text-blue-800 font-bold">Dashboard</span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <FaSearch className="absolute left-2 top-2 text-gray-500" />
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-8 pr-3 py-1 border border-gray-300 bg-blue-50 rounded-md w-72 focus:outline-none"
          />
        </div>
        <select className="border w-24 border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none">
          <option value="" disabled selected></option>
        </select>
        <FaBell className="text-gray-700" />
        <div className="flex items-center border space-x-1 border-gray-300 px-2 py-1 rounded-md">
          <div className="flex items-center justify-between space-x-5">
            <FaUser className="text-gray-700" />
            <span className="text-gray-700">John Doe</span>
          </div>
          <FaChevronDown className="text-gray-700 pt-1" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;