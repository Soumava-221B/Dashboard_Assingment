import React, { useState, useRef } from "react";
import AddWidget from "../AddWidget";
import DonutWidget from "../dashboard/DonutWidget";
import TemplateWidget from "../dashboard/TemplateWidget";
import ProgressBarWidget from "../dashboard/ProgressBarWidget";
import HideScroll from "../HideScroll";
import { dashboardData } from "../../database/data";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import WidgetSelectionModal from "../dashboard/WidgetSelectionModal";
import {
  saveWidgetsToLocalStorage,
  loadWidgetsFromLocalStorage,
} from "../../utils/utils";

const LOCAL_STORAGE_KEY = "dashboardWidgets";

const DashboardMain = ({ searchQuery }) => {
  const [categories, setCategories] = useState(() => {
    const storedWidgets = loadWidgetsFromLocalStorage(LOCAL_STORAGE_KEY);
    return dashboardData.categories.map((category, index) => ({
      ...category,
      widgets: storedWidgets[index]?.widgets || [],
    }));
  });

  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [initialCheckedWidgets, setInitialCheckedWidgets] = useState({});

  const availableWidgets = dashboardData.categories
    .flatMap((category) => category.widgets)
    .concat({ title: "No Data", type: "blank" });

  const scrollContainerRef = useRef(null);

  const openPopup = (categoryIndex) => {
    setSelectedCategoryIndex(categoryIndex);
    const categoryWidgets = categories[categoryIndex]?.widgets || [];
    const checkedWidgets = categoryWidgets.reduce((acc, widget) => {
      acc[widget.title] = true;
      return acc;
    }, {});
    setInitialCheckedWidgets(checkedWidgets);
    setShowPopup(true);
  };

  const handleWidgetSelect = (selectedWidgets, categoryIndex) => {
    if (categoryIndex !== null) {
      setCategories((prevCategories) => {
        const updatedCategories = prevCategories.map((category, index) => {
          if (index === categoryIndex) {
            return {
              ...category,
              widgets: selectedWidgets.map((widget) => ({
                widgetId: Date.now() + Math.random(),
                ...widget,
              })),
            };
          }
          return category;
        });

        saveWidgetsToLocalStorage(LOCAL_STORAGE_KEY, updatedCategories);
        return updatedCategories;
      });
    }

    setShowPopup(false);
    setSelectedCategoryIndex(null);
  };

  const removeWidget = (categoryIndex, widgetId) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((category, index) => {
        if (index === categoryIndex) {
          return {
            ...category,
            widgets: category.widgets.filter(
              (widget) => widget.widgetId !== widgetId
            ),
          };
        }
        return category;
      });

      saveWidgetsToLocalStorage(LOCAL_STORAGE_KEY, updatedCategories);
      return updatedCategories;
    });
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const filteredCategories = categories
    .map((category) => {
      const matchingWidgets = category.widgets.filter((widget) =>
        widget.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return {
        ...category,
        widgets: matchingWidgets,
      };
    })
    .filter((category) => category.widgets.length > 0); 

  const sortedCategories = searchQuery
    ? [...filteredCategories].sort(
        (a, b) => b.widgets.length - a.widgets.length
      )
    : categories;

  return (
    <div className="flex flex-col pt-2 mb-5 px-10">
      {sortedCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-8 relative">
          <span className="text-md font-bold text-zinc-800 mb-2 block px-10">
            {category.categoryName}
          </span>
          <div className="relative flex items-center">
            {category.widgets.length >= 3 && (
              <>
                <FaChevronCircleLeft
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl rounded cursor-pointer z-10"
                  aria-label="Scroll Left"
                />
                <FaChevronCircleRight
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl rounded cursor-pointer z-10"
                  aria-label="Scroll Right"
                />
              </>
            )}
            <HideScroll
              ref={scrollContainerRef}
              className="overflow-x-auto py-2 flex space-x-6 ml-10 mr-10"
            >
              <div className="flex space-x-6">
                {category.widgets.map((widget) => (
                  <div
                    key={widget.widgetId}
                    className="flex-shrink-0 w-[27rem]"
                  >
                    {widget.type === "blank" ? (
                      <TemplateWidget
                        onRemove={() =>
                          removeWidget(categoryIndex, widget.widgetId)
                        }
                      />
                    ) : widget.type === "customProgressBar" ? (
                      <ProgressBarWidget
                        title={widget.title}
                        data={widget.data}
                        labels={widget.labels}
                        colors={widget.colors}
                        onRemove={() =>
                          removeWidget(categoryIndex, widget.widgetId)
                        }
                      />
                    ) : (
                      <DonutWidget
                        title={widget.title}
                        data={widget.data}
                        labels={widget.labels}
                        dotColors={widget.dotColors}
                        onRemove={() =>
                          removeWidget(categoryIndex, widget.widgetId)
                        }
                      />
                    )}
                  </div>
                ))}
                <div className="flex-shrink-0 w-[27rem]">
                  <AddWidget onClick={() => openPopup(categoryIndex)} />
                </div>
              </div>
            </HideScroll>
          </div>
        </div>
      ))}

      {showPopup && (
        <WidgetSelectionModal
          categories={dashboardData.categories}
          availableWidgets={availableWidgets}
          onWidgetSelect={(selectedWidgets) =>
            handleWidgetSelect(selectedWidgets, selectedCategoryIndex)
          }
          onClose={() => setShowPopup(false)}
          selectedWidgets={initialCheckedWidgets}
        />
      )}
    </div>
  );
};

export default DashboardMain;
