import React from "react";
import trade_green from "../../assets/icons/trade-up-green.png"
import trade_red from "../../assets/icons/trade-down-red.png"
import trending1 from "../../assets/icons/trending 1.png"
import trending2 from "../../assets/icons/trending 2.png"
import trending3 from "../../assets/icons/trending 2.png"
import trending4 from "../../assets/icons/trending 4.png"

const trendingData = [
  {
    name: "Sui",
    symbol: "SUI",
    amount: "1.56 SUI",
    value: "$2,455,806,673",
    change: "-10.5%",
    changeType: "negative",
    icon: trending1,
  },
  {
    name: "Ginnan The...",
    symbol: "GINNAN",
    amount: "8.36 GINNAN",
    value: "$34,007,492",
    change: "+3.2%",
    changeType: "positive",
    icon: trending2,
  },
  {
    name: "Toncoin",
    symbol: "TON",
    amount: "6.95 TON",
    value: "$17,524,537,268",
    change: "+7.5%",
    changeType: "positive",
    icon: trending3,
  },
  {
    name: "Solana",
    symbol: "SOL",
    amount: "143.76 SOL",
    value: "$67,116,052,923",
    change: "-0.05%",
    changeType: "negative",
    icon: trending4,
  },
];

const Trending = () => {
  return (
    <div className="flex flex-row p-3 gap-2.5">
      {trendingData.map((crypto, index) => (
        <div key={index} className="flex flex-col gap-2.5 rounded-xl p-3 border border-gray dark:border-opacity-15">
          <div className="flex flex-row gap-5">
            <div className="flex flex-row items-center gap-1.5">
              <img src={crypto.icon} alt={crypto.name} />
              <div className="font-bold">
                <div className="text-xs text-dark-gray dark:text-white text-nowrap">{crypto.name}</div>
                <div className="text-xxs text-dark-gray dark:text-gray text-opacity-60">{crypto.symbol}</div>
              </div>
            </div>
            <div
              className={`text-xxs flex dark:text-light-gray flex-row justify-center items-center py-1 px-1.5 h-5 gap-1 font-semibold ${
                crypto.changeType === "positive" ? "text-green bg-green bg-opacity-15 rounded-100" : "text-red bg-red bg-opacity-15 rounded-100"
              }`}
            >
              <span>{crypto.change}</span>
              <div><img src={
                crypto.changeType === "positive" ? trade_green : trade_red } alt="" /></div>
            </div>
          </div>
          <div className="font-bold">
            <div className="text-xs text-dark-gray dark:text-white">{crypto.amount}</div>
            <div className="text-xxs text-dark-gray text-opacity-60 dark:text-gray">{crypto.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trending;
