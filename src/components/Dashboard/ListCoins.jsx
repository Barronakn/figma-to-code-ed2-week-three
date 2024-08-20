import React, { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import star from "../../assets/icons/star.png";
import ellipsis from "../../assets/icons/ellipsis.png";
import { fetchCoins } from "../../data/apicoins";
import search from "../../assets/icons/search.png";
import arrow_down from "../../assets/icons/chevron-down.png";

const ListCoins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCoins = async () => {
      try {
        const data = await fetchCoins();
        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCoins();
  }, []);

  const getSparklineColor = (prices) => {
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    return lastPrice > firstPrice ? "#00C49F" : "#FF4D4F";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <form className="flex flex-row justify-between text-dark-gray" action="#">
        <div className="flex flex-row items-center gap-1.5 border px-5 py-2.5 border-gray rounded-10">
          <div>
            <img src={search} alt="search-icon" />
          </div>
          <input
            className="placeholder:dark:bg-dark-blue-1"
            type="search"
            name="search"
            placeholder="Search crypto..."
          />
        </div>
        <div className="border border-gray rounded-10 px-5 py-2.5 hover:cursor-pointer">
          <div className="flex flex-row gap-10 items-center">
            <div>Categories</div>
            <div>
              <img src={arrow_down} alt="arrow-down-icon" />
            </div>
          </div>
        </div>
      </form>

      <div className="bg-white dark:bg-dark-blue-1 dark:text-white shadow-md rounded-10 border border-gray overflow-x-hidden z-0">
        <div className="flex flex-row items-center justify-between border-b border-b-gray p-4">
          <div>
            <h3 className="text-base font-semibold">Market</h3>
          </div>
          <div className="cursor-pointer border border-gray px-5 py-2.5 rounded-10">
            <img src={ellipsis} alt="ellipsis-icon" />
          </div>
        </div>
        <table className="min-w-full bg-white dark:bg-dark-blue-1 font-medium text-sm">
          <thead className="bg-gray dark:bg-opacity-10">
            <tr className="border-b border-b-gray">
              <th className="py-3 px-6 font-medium text-sm text-left"></th>
              <th className="py-3 px-6 font-medium text-sm text-left">#</th>
              <th className="py-3 px-6 font-medium text-sm text-left">Coins</th>
              <th className="py-3 px-6 font-medium text-sm text-right">
                Price
              </th>
              <th className="py-3 px-6 font-medium text-sm text-right">24h</th>
              <th className="py-3 px-6 font-medium text-sm text-right">
                24h Volume
              </th>
              <th className="py-3 px-6 font-medium text-sm text-right">
                Market Cap
              </th>
              <th className="py-3 px-6 font-medium text-sm text-right">
                Last 7 Days
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm text-center">
            {coins.map((coin, index) => (
              <tr className="border-b border-b-gray" key={coin.id}>
                <td className="py-3 pl-6">
                  <img src={star} alt="star-icon" />
                </td>
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 flex flex-row gap-2.5 items-center">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 mr-2"
                  />
                  <span>
                    {coin.name} - {coin.symbol.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-6 text-right">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td
                  className={`py-3 px-6 text-right ${
                    coin.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="py-3 px-6 text-right">
                  ${coin.total_volume.toLocaleString()}
                </td>
                <td className="py-3 px-6 text-right">
                  ${coin.market_cap.toLocaleString()}
                </td>
                <td className="py-3 px-6 text-right">
                  <ResponsiveContainer width={100} height={40}>
                    <LineChart
                      data={coin.sparkline_in_7d.price.map((p, i) => ({
                        index: i,
                        price: p,
                      }))}
                    >
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke={getSparklineColor(coin.sparkline_in_7d.price)}
                        dot={false}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCoins;
