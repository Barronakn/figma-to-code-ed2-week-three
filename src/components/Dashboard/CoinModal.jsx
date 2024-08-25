import React, { useState, useEffect } from "react";
import close_icon from "../../assets/icons/close.png";
import star from "../../assets/icons/star.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CoinModal = ({ coin, onClose }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=365`
        );
        const result = await response.json();

        const monthlyData = [];
        const currentYear = new Date().getFullYear();

        result.prices.forEach((priceData) => {
          const date = new Date(priceData[0]);
          if (date.getFullYear() === currentYear) {
            const month = date.toLocaleString("default", { month: "short" });
            const price = priceData[1];
            monthlyData.push({ name: month, price });
          }
        });

        setData(monthlyData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du coin:", error);
      }
    };

    fetchCoinData();
  }, [coin.id]);

  const removeHTMLTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  return (
    <div className="fixed font-JetBrains inset-0 p-2 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-1/3 h-full flex flex-col gap-6.5 rounded-2xl bg-white dark:bg-dark-blue-1 shadow-lg p-4 overflow-y-auto">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-base font-semibold">{coin.name}</h3>
          <div
            onClick={onClose}
            className="cursor-pointer bg-gray bg-opacity-50 p-2.5 rounded-lg text-xl font-bold"
          >
            <img className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 pointer-events-none" loading="lazy" src={close_icon} alt="close-icon" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 30,
                  right: 30,
                  left: 30,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  domain={[-100, 100]}
                  ticks={[100, 60, 20, 0, -20, -60, -100]}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="green"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <img className="w-8 h-8 pointer-events-none" loading="lazy" src={coin.image.small} alt={coin.name} />
              <h2 className="text-sm font-semibold">{coin.name}</h2>
            </div>

            <div className="flex flex-row justify-between">
              <p className="text-sm font-semibold">
                {" "}
                ${coin.market_data.current_price.usd.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="text-sm flex flex-row items-center justify-between">
            <p className="text-sm font-semibold">Market Cap Rank:</p>
            <p className="text-lg bg-light-gray rounded-100 py-1 px-2">
              Rank #{coin.market_cap_rank}
            </p>
          </div>

          <div className="text-sm flex flex-row justify-between">
            <p className="text-sm font-semibold">Market Cap:</p>
            <p className="text-sm font-semibold text-dark-gray">
              {" "}
              ${coin.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>
          <div className="text-sm flex flex-row justify-between">
            <p className="text-sm font-semibold">Circulating Supply:</p>{" "}
            <p className="text-sm font-semibold text-dark-gray">
              {coin.market_data.circulating_supply.toLocaleString()}
            </p>
          </div>
          <div className="text-sm flex flex-row justify-between">
            <p className="text-sm font-semibold">24 Hour High:</p>
            <p className="text-sm font-semibold text-dark-gray">
              {" "}
              ${coin.market_data.high_24h.usd.toLocaleString()}
            </p>
          </div>
          <div className="text-sm flex flex-row justify-between">
            <p className="text-sm font-semibold">24 Hour Low:</p>
            <p className="text-sm font-semibold text-dark-gray">
              {" "}
              ${coin.market_data.low_24h.usd.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="text-sm font-semibold">
          <p>Description</p>
          <p className="text-dark-gray">
            {removeHTMLTags(coin.description.en)}
          </p>
        </div>

        <div className="flex flex-row justify-center bg-blue bg-opacity-6 gap-1.5 rounded-10 px-5 py-2.5">
          <img className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 pointer-events-none" loading="lazy" src={star} alt="star-icon" />
          <span className="text-blue text-sm">Add to favorites</span>
        </div>
      </div>
    </div>
  );
};

export default CoinModal;
