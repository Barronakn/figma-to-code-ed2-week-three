import React, { useEffect, useState } from "react";
import trade_green from "../../assets/icons/trade-up-green.png";
import trade_red from "../../assets/icons/trade-down-red.png";

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/search/trending");
        const data = await response.json();
        const mappedData = data.coins.map((coin) => {
          const priceChange = coin.item.data.price_change_percentage_24h?.usd || 0; 
          return {
            name: coin.item.name,
            symbol: coin.item.symbol,
            amount: `${coin.item.price_btc.toFixed(8)} BTC`,
            value: `$${(coin.item.price_btc * 100000000).toFixed(2)}`, // Convert BTC to USD (example conversion)
            change: `${priceChange.toFixed(1)}%`,
            changeType: priceChange >= 0 ? "positive" : "negative",
            icon: coin.item.thumb,
          };
        });
        setTrendingData(mappedData);
      } catch (error) {
        console.error("Error fetching trending data:", error);
      }
    };

    fetchTrendingData();
  }, []);

  return (
    <div className="flex flex-row p-3 gap-2.5">
      {trendingData.slice(0,4).map((crypto, index) => (
        <div key={index} className="flex flex-col gap-2.5 rounded-xl p-3 border border-gray dark:border-opacity-15">
          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-row items-center gap-1.5"> 
              <img className="pointer-events-none w-8 h-8" loading="lazy" src={crypto.icon} alt={crypto.name} />
              <div className="font-bold">
                <div className="text-xs text-dark-gray dark:text-white">{crypto.name}</div>
                <div className="text-xxs text-dark-gray dark:text-gray text-opacity-60">{crypto.symbol}</div>
              </div>
            </div>

            <div
              className={`text-xxs flex dark:text-light-gray flex-row justify-center items-center py-1 px-1.5 h-5 gap-1 font-semibold ${
                crypto.changeType === "positive" ? " bg-green bg-opacity-15 rounded-100" : "bg-red bg-opacity-15 rounded-100"
              }`}
            >
              <span className={`${
                crypto.changeType === "positive" ? "text-green dark:text-white" : "text-red dark:text-white"
              }`}>{crypto.change}</span>
              <div>
                <img className="pointer-events-none" loading="lazy" src={crypto.changeType === "positive" ? trade_green : trade_red} alt="trade-icon" />
              </div>
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
