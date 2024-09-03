import React from "react";
import arrow_up from "../../assets/icons/arrow-up.png";
import arrow_down from "../../assets/icons/arrow-down-blue.png";
import { useStateContext } from "../../contexts/ContextProvider";

const Balance = () => {
  const { exchangeRates, selectedCurrency } = useStateContext();

  // Valeur de balance en BTC
  const btcValue = 1082.20;
  // Conversion de BTC à la devise sélectionnée
  const conversionRate = exchangeRates[selectedCurrency]?.value || 1;
  const convertedBalance = (btcValue * conversionRate).toFixed(2);

  return (
    <div className="rounded-xl border border-gray dark:border-opacity-15 p-3 flex flex-col gap-2">
      <div className="flex flex-col gap-1.5">
        <div className="text-xl md:text-lg font-semibold dark:text-gray">Balance</div>
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="text-lg font-bold dark:text-white">
             <p className="text-nowrap">{exchangeRates[selectedCurrency]?.unit || "BTC"}{convertedBalance}</p>
          </div>
          <div className="text-green-500 flex flex-row items-center gap-1.5">
            <span className="text-xs md:text-xxs text-green py-1 px-1.1 bg-green bg-opacity-15 rounded-100 font-semibold">
              +2.3%
            </span>
            <span className="text-sm md:text-xs text-dark-gray text-nowrap">vs last month</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center sm:flex-row gap-1.5">
        <button className="px-4 py-2 w-full rounded-10 bg-blue bg-opacity-6 flex flex-row items-center justify-center gap-1.5">
          <img className="pointer-events-none" loading="lazy" src={arrow_up} alt="arrow-up-icon" />
          <span className="text-sm font-medium text-blue">Deposit</span>
        </button>
        <button className="px-4 py-2 w-full rounded-10 bg-blue bg-opacity-6 flex flex-row items-center justify-center gap-1.5">
          <img className="pointer-events-none" loading="lazy" src={arrow_down} alt="arrow-down-icon" />
          <span className="text-sm font-medium text-blue">Withdraw</span>
        </button>
      </div>
    </div>
  );
};

export default Balance;
