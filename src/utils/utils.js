export const saveWidgetsToLocalStorage = (key, widgets) => {
    try {
      const serializedWidgets = JSON.stringify(widgets);
      localStorage.setItem(key, serializedWidgets);
    } catch (error) {
      console.error("Error saving widgets to local storage", error);
    }
  };
  
  export const loadWidgetsFromLocalStorage = (key) => {
    try {
      const serializedWidgets = localStorage.getItem(key);
      if (serializedWidgets === null) {
        return []; 
      }
      return JSON.parse(serializedWidgets);
    } catch (error) {
      console.error("Error loading widgets from local storage", error);
      return [];
    }
  };
  
  export const removeWidgetsFromLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing widgets from local storage", error);
    }
  };  