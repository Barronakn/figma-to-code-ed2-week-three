import React, { useEffect, useState } from "react";
import star from "../../assets/icons/star.png";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import ellipsis from "../../assets/icons/ellipsis.png";
import search from "../../assets/icons/search.png";
import arrow_down from "../../assets/icons/chevron-down.png";
import { fetchCoins } from "../../data/apicoins";
import { fetchCategories } from "../../data/categorycoins";
import { fetchCoinDetails } from "../../data/coinsdetails";
import CoinModal from "./CoinModal";

const ListCoins = () => {
  const [coins, setCoins] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const data = [
    { name: "Jan", price: -60 },
    { name: "Feb", price: -20 },
    { name: "Mar", price: 80 },
    { name: "Apr", price: 20 },
    { name: "Mai", price: 60 },
    { name: "Mai", price: -60 },
  ];

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

  const removeHTMLTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
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
      : coins.filter((coin) =>
          coin.categories.some((category) => category === selectedCategory)
        );

  return (
    <div className="flex flex-col gap-8">
      <form className="flex flex-row justify-between text-dark-gray" action="#">
        <div className="flex flex-row items-center gap-1.5 border px-5 py-2.5 border-gray dark:border-opacity-15 rounded-10">
          <div>
            <img src={search} alt="search-icon" />
          </div>
          <input
            className="dark:bg-dark-blue-1"
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
            <div className=" dark:text-white">{selectedCategory || "Categories"}</div>
            <div>
              <img src={arrow_down} alt="arrow-down-icon" />
            </div>
          </div>

          {isCategoryDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 bg-white dark:bg-dark-blue-1 border border-gray dark:border-opacity-15 rounded-10 w-full dark:text-white z-10 overflow-x-hidden overflow-y-auto h-40">
              <div
                onClick={() => handleCategorySelect("Categories")}
                className="px-5 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer dark:text-white hover:bg-gray dark:hover:bg-opacity-50"
              >
                Categories
              </div>
              {categories.map((category) => (
                <div
                  key={category.category_id}
                  onClick={() => handleCategorySelect(category.name)}
                  className="px-5 dark:text-white py-2.5 text-nowrap dark:hover:bg-opacity-50 hover:bg-gray dark:hover:bg-gray-700 cursor-pointer"
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
                  <span
                    className="cursor-pointer"
                    onClick={() => openModal(coin)}
                  >
                    {coin.name}{" "}
                    <span className="text-gray-500">
                      ({coin.symbol.toUpperCase()})
                    </span>
                  </span>
                </td>
                <td className="py-3 px-6 text-right">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td className="py-3 px-6 text-right">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="py-3 px-6 text-right">
                  ${coin.total_volume.toLocaleString()}
                </td>
                <td className="py-3 px-6 text-right">
                  ${coin.market_cap.toLocaleString()}
                </td>
                <td className="py-3 px-6">
                  <Sparklines
                    data={coin.sparkline_in_7d.price}
                    height={50}
                    width={100}
                    margin={5}
                  >
                    <SparklinesLine
                      color={getSparklineColor(coin.sparkline_in_7d.price)}
                    />
                    <SparklinesSpots />
                  </Sparklines>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedCoin && (
        <CoinModal
          coin={selectedCoin}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ListCoins;
