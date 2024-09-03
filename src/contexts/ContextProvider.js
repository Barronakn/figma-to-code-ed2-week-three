import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

const initialState = {
  userProfile: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false); 
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/exchange_rates");
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setActiveMenu(true);
    } else {
      setActiveMenu(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setActiveMenu(!activeMenu);
  };

  const setMode = (mode) => {
    setCurrentMode(mode);
    localStorage.setItem('themeMode', mode);
  };


  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        handleClick,
        screenSize, 
        setScreenSize,
        currentMode,
        themeSettings, 
        setThemeSettings,
        setMode,
        toggleMenu,
        exchangeRates,
        selectedCurrency,
        setSelectedCurrency,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
