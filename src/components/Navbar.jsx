import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import dark_icon from "../assets/icons/dark-icon.png";
import light_icon from "../assets/icons/sun.png";
import wallet from "../assets/icons/add-wallet.png";
import chevron_up_down from "../assets/icons/chevron-up-down.png";
import menu from "../assets/icons/menu.png";

const Navbar = () => {
  const { currentMode, setMode, toggleMenu } = useStateContext();
  const [showMode, setShowMode] = useState(true);

  const handleToggle = () => {
    setShowMode(!showMode);
    setMode(showMode ? "Dark" : "Light");
  };

  return (
    <div className="container">
      <div className="flex flex-row items-center justify-between sm:gap-5 gap-1.5 dark:text-gray-200 dark:[#484B52] sm:px-6 py-3 px-0 bg-white dark:bg-dark-blue-1">
        <div className="flex flex-row gap-5.5">
        <div className="block tablet:hidden">
          <img
            onClick={toggleMenu}
            className="rounded-10 border border-gray p-2"
            src={menu}
            alt="menu-icon"
          />
        </div>

        <div className="flex flex-row gap-4">
          <div>
            <h2 className="text-sm font-semibold dark:text-white">Dashboard</h2>
            <p className="text-xs font-medium text-dark-gray">
              Welcome back, John Doe!
            </p>
          </div>

          <div className="sm:block hidden">
            <button className="flex flex-row items-center rounded-10 text-sm font-medium px-5 py-2.5 gap-1.5 bg-blue text-white dark:text-black">
              <img
                className="pointer-events-none"
                loading="lazy"
                src={wallet}
                alt="wallet-icon"
              />
              <span className="dark:text-white">Connect wallet</span>
            </button>
          </div>
        </div>
        </div>

        <div className="flex flex-row gap-1.5 items-center justify-center sm:gap-3">
          <div className="flex flex-row gap-0.5 items-center cursor-pointer border border-gray dark:border-opacity-15 p-2 rounded-10 px-2 sm:px-5 sm:py-2.5">
            <span className="text-gray text-xs text-center text-nowrap font-medium">
              USD
            </span>
            <img
              className="dark:filter dark:invert dark:brightness-0 dark:contrast-100  pointer-events-none"
              loading="lazy"
              src={chevron_up_down}
              alt="chevron-up-down-icon"
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            {showMode ? (
              <div
                onClick={handleToggle}
                className={`cursor-pointer border border-gray px-2 py-3 sm:px-5 sm:py-2.5 rounded-10 ${
                  currentMode === "Dark" ? "opacity-100" : "opacity-50"
                }`}
              >
                <img
                  className="pointer-events-none "
                  loading="lazy"
                  src={dark_icon}
                  alt="dark-icon"
                />
              </div>
            ) : (
              <div
                onClick={handleToggle}
                className="cursor-pointer border border-gray dark:border-opacity-15 px-2 py-3 sm:px-5 sm:py-2.5 rounded-10"
              >
                <img
                  className="pointer-events-none"
                  loading="lazy"
                  src={light_icon}
                  alt="light-icon"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
