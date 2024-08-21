import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const WidgetSelectionModal = ({
  categories,
  availableWidgets,
  onWidgetSelect,
  onClose,
  selectedWidgets = {}, 
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.shortName || 'CSPM');
  const [checkedWidgets, setCheckedWidgets] = useState({});

  useEffect(() => {
    setCheckedWidgets(selectedWidgets);
  }, [selectedWidgets]);

  const filteredWidgets = availableWidgets.filter(widget => {
    const category = categories.find(cat => cat.widgets.some(w => w.title === widget.title));
    return category && category.shortName === selectedCategory;
  });

  const handleCheckboxChange = (widgetTitle) => {
    setCheckedWidgets(prevState => ({
      ...prevState,
      [widgetTitle]: !prevState[widgetTitle]
    }));
  };

  const handleSave = () => {
    const selectedWidgets = filteredWidgets.filter(widget => checkedWidgets[widget.title]);
    onWidgetSelect(selectedWidgets);
    onClose(); 
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-gray-800 bg-opacity-50 z-20">
      <div className="bg-white w-1/3 h-full rounded shadow-lg relative">
        <div className="bg-blue-950 p-2 flex justify-between items-center">
          <h2 className="text-md font-bold text-zinc-100">Select a Widget</h2>
          <button onClick={onClose} className="text-zinc-100">
            <FaTimes size={18} />
          </button>
        </div>
        <p className="text-[16px] text-gray-500 pt-3 pl-2 font-sans font-semibold">
          Personalize the dashboard by adding the selected widget.
        </p>

        <div className="p-2 flex space-x-2">
          {categories.map(category => (
            <button
              key={category.shortName}
              onClick={() => setSelectedCategory(category.shortName)}
              className={`px-4 py-2 ${selectedCategory === category.shortName ? 'border-b-2 border-blue-950 font-bold text-blue-950' : 'text-gray-500'} hover:text-blue-800`}
            >
              {category.shortName}
            </button>
          ))}
        </div>

        <ul className="list-disc overflow-y-auto h-[65%] space-y-2 p-2">
          {filteredWidgets.map((widget) => (
            <li key={widget.title} className="list-none p-2 hover:bg-slate-100 border border-gray-500 flex items-center rounded-md">
              <input
                type="checkbox"
                checked={!!checkedWidgets[widget.title]}
                onChange={() => handleCheckboxChange(widget.title)}
                className="mr-2"
              />
              {widget.title}
            </li>
          ))}
        </ul>

        <div className="flex justify-end space-x-2 mt-[4rem] p-2">
          <button 
            onClick={onClose} 
            className="border border-blue-950 px-5 py-1 rounded text-blue-950"
            aria-label="Close"
          >
            Close
          </button>

          <button 
            onClick={handleSave} 
            className="bg-blue-950 hover:bg-blue-900 px-5 py-1 rounded text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetSelectionModal;