import React, { useEffect, useState } from "react";
import search from "../../assets/icons/search.png";
import arrow_down from "../../assets/icons/chevron-down-gray.png";
import { fetchCoins } from "../../data/apicoins";
import { fetchCategories } from "../../data/categorycoins";
import { fetchCoinDetails } from "../../data/coinsdetails";
import CoinModal from "./CoinModal";
import CoinTable from "./CoinTable";

const ListCoins = () => {
  const [coins, setCoins] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(coins.length / itemsPerPage);

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

  const handleCategoryDropdownToggle = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const openModal = async (coin) => {
    try {
      const coinDetails = await fetchCoinDetails(coin.id);
      setSelectedCoin(coinDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching coin details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = coins.slice(indexOfFirstItem, indexOfLastItem);

  const getSparklineColor = (sparkline) => {
    const firstPrice = sparkline[0];
    const lastPrice = sparkline[sparkline.length - 1];
    return lastPrice > firstPrice ? "green" : "red";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredCoins =
    selectedCategory === "Categories"
      ? coins
      : coins.filter((coin) =>
          coin.categories.includes(selectedCategory.toLowerCase())
        );

  return (
    <div className="listcoins">
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between mb-4">
        <div className="flex flex-row items-center gap-4 bg-white dark:bg-dark-blue-1 dark:text-white border border-gray dark:border-opacity-15 rounded-10 w-full sm:w-auto px-4 py-2 focus:outline-none">
            <img
              loading="lazy"
              src={search}
              alt="search-icon"
              className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 pointer-events-none h-5 w-5"
            />
          <div className="relative">
            <input
              type="text"
              placeholder="Search crypto..."
              className="dark:bg-dark-blue-1 placeholder:text-dark-gray w-fit"
            />
          </div>
        </div>

        <div
          className="relative cursor-pointer w-full sm:w-auto"
          onClick={handleCategoryDropdownToggle}
        >
          <div className="flex flex-row items-center border border-gray dark:border-opacity-15 bg-white dark:bg-dark-blue-1 dark:text-white rounded-10 px-4 py-2">
            <span className="text-sm text-dark-gray">{selectedCategory}</span>
            <div>
            <img
              className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 ml-2 pointer-events-none"
              loading="lazy"
              src={arrow_down}
              alt="arrow-down-icon"
            />
            </div>
          </div>
          {isCategoryDropdownOpen && (
            <div className="absolute mt-2 bg-white dark:bg-dark-blue-1 dark:text-white border border-gray dark:border-opacity-15 rounded-10 z-10 w-full h-40 overflow-x-hidden overflow-y-auto">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="px-4 py-2 text-sm text-dark-gray dark:hover:bg-dark-blue-2 hover:bg-gray hover:bg-opacity-50 cursor-pointer"
                  onClick={() => handleCategorySelect(category.name)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CoinTable
        currentItems={currentItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        paginate={paginate}
        filteredCoins={filteredCoins}
        openModal={openModal}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        getSparklineColor={getSparklineColor}
      />

      {isModalOpen && selectedCoin && (
        <CoinModal coin={selectedCoin} onClose={closeModal} />
      )}
    </div>
  );
};

export default ListCoins;
