import React, { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import star from "../../assets/icons/star.png";
import ellipsis from "../../assets/icons/ellipsis.png";
import search from "../../assets/icons/search.png";
import arrow_down from "../../assets/icons/chevron-down.png";
import { fetchCoins } from "../../data/apicoins";
import { fetchCategories } from "../../data/categorycoins";
import { fetchCoinDetails } from "../../data/coinsdetails";

const ListCoins = () => {
  const [coins, setCoins] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const getCoinsAndCategories = async () => {
      try {
        const coinsData = await fetchCoins();
        setCoins(coinsData);

        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCoinsAndCategories();
  }, []);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setIsCategoryDropdownOpen(false);
  };

  const getSparklineColor = (prices) => {
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    return lastPrice > firstPrice ? "#00C49F" : "#FF4D4F";
  };

  const openModal = async (coin) => {
    try {
      const coinDetails = await fetchCoinDetails(coin.id);
      setSelectedCoin(coinDetails);
      setIsModalOpen(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoin(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredCoins =
    selectedCategory === "Categories"
      ? coins
      : coins.filter((coin) => coin.category === selectedCategory);


  return (
    <div className="flex flex-col gap-8">
      <form className="flex flex-row justify-between text-dark-gray" action="#">
        <div className="flex flex-row items-center gap-1.5 border px-5 py-2.5 border-gray dark:border-opacity-15 rounded-10">
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
        <div
          className="relative border border-gray dark:border-opacity-15 rounded-10 px-5 py-2.5 hover:cursor-pointer"
          onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
        >
          <div className="flex flex-row gap-10 items-center">
            <div>{selectedCategory || "Categories"}</div>
            <div>
              <img src={arrow_down} alt="arrow-down-icon" />
            </div>
          </div>

          {isCategoryDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 bg-white dark:bg-dark-blue-1 border border-gray dark:border-opacity-15 rounded-10 w-full z-10 overflow-x-hidden overflow-y-auto h-40">
              <div
                onClick={() => handleCategorySelect("Categories")}
                className="px-5 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer hover:bg-gray"
              >
                Categories
              </div>
              {categories.map((category) => (
                <div
                  key={category.category_id}
                  onClick={() => handleCategorySelect(category.name)}
                  className="px-5 py-2.5 text-nowrap hover:bg-gray dark:hover:bg-gray-700 cursor-pointer"
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>

      <div className="bg-white dark:bg-dark-blue-1 dark:text-white shadow-md rounded-10 border border-gray dark:border-opacity-15 overflow-x-hidden z-0">
        <div className="flex flex-row items-center justify-between border-b border-b-gray dark:border-opacity-15 p-4">
          <div>
            <h3 className="text-base font-semibold">Market</h3>
          </div>
          <div className="cursor-pointer border border-gray dark:border-opacity-15 px-5 py-2.5 rounded-10">
            <img src={ellipsis} alt="ellipsis-icon" />
          </div>
        </div>
        <table className="min-w-full bg-white dark:bg-dark-blue-1 font-medium text-sm">
          <thead className="bg-gray dark:bg-opacity-10">
            <tr className="border-b border-b-gray dark:border-opacity-15">
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
            {filteredCoins.map((coin, index) => (
              <tr
                className="border-b border-b-gray dark:border-opacity-15"
                key={coin.id}
              >
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
                  <span className="cursor-pointer" onClick={() => openModal(coin)}>
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

      {isModalOpen && selectedCoin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-1/3 h-full bg-white dark:bg-dark-blue-1 shadow-lg p-4">
            <h2>{selectedCoin.name}</h2>
            <p>Price: ${selectedCoin.market_data.current_price.usd.toLocaleString()}</p>
            <p>Market Cap: ${selectedCoin.market_data.market_cap.usd.toLocaleString()}</p>
            <p>24h High: ${selectedCoin.market_data.high_24h.usd.toLocaleString()}</p>
            <p>24h Low: ${selectedCoin.market_data.low_24h.usd.toLocaleString()}</p>
            <p>Description: {selectedCoin.description?.en}</p>
            <button onClick={closeModal} className="text-black">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCoins;
