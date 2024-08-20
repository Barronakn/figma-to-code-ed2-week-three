import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import dark_icon from "../assets/icons/dark-icon.png"
import light_icon from "../assets/icons/sun.png"

const Navbar = () => {
  const { currentMode, setMode } = useStateContext();
  const [showMode, setShowMode] = useState(true);

  const handleToggle = () => {
    setShowMode(!showMode);
    setMode(showMode ? 'Dark' : 'Light');
  };

  return (
    <div className="flex flex-row justify-between dark:text-gray-200 dark:[#484B52] px-6 py-3">
      <div>
        <h2>Dashboard</h2>
        <p>Welcome back, John Doe!</p>
      </div>
      <div className="flex items-center space-x-4">
        {showMode ? (
          <div
            onClick={handleToggle}
            className={`cursor-pointer border border-gray p-2 rounded-lg ${currentMode === 'Dark' ? 'opacity-100' : 'opacity-50'}`}
          >
            <img src={dark_icon} alt="dark-icon" />
          </div>
        ) : (
          <div
            onClick={handleToggle}
            className={`cursor-pointer border border-gray p-2 rounded-lg ${currentMode === 'Light' ? 'opacity-100' : 'opacity-50'}`}
          >
            <img src={light_icon} alt="light-icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
