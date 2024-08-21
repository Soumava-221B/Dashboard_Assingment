import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const TemplateWidget = ({ onRemove }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex justify-center bg-gray-50 items-center border shadow-sm rounded-lg p-4 h-56"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && onRemove && (
        <FaTimes
          className="absolute top-2 right-2 text-red-500 cursor-pointer"
          onClick={onRemove}
        />
      )}
      No Data Avialiable
    </div>
  );
};

export default TemplateWidget;