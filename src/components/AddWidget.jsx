import React from "react";
import { FaPlus } from "react-icons/fa";

const AddWidget = ({ onClick }) => {
  return (
    <div
      className="flex justify-center bg-white items-center border shadow-sm rounded-lg p-4 h-56 cursor-pointer"
      onClick={onClick}
    >
      <button className="flex items-center space-x-2 px-4 py-2 bg-white text-zinc-500 border border-zinc-300 rounded-lg">
        <FaPlus />
        <span>Add Widget</span>
      </button>
    </div>
  );
};

export default AddWidget;