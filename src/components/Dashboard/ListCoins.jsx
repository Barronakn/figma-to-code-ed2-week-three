import React, { useEffect, useState } from "react";
import search from "../../assets/icons/search.png";
import arrow_down from "../../assets/icons/chevron-down.png";
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
    <div className="container mx-auto p-4">
      <div className="flex flex-row items-center justify-between mb-4">
        <div className="flex flex-row items-center gap-4 bg-white dark:bg-dark-blue-1 dark:text-white border border-gray dark:border-opacity-15 rounded-10 px-4 py-2 focus:outline-none">
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
              className="dark:bg-dark-blue-1 w-fit"
            />
          </div>
        </div>

        <div
          className="relative cursor-pointer"
          onClick={handleCategoryDropdownToggle}
        >
          <div className="flex flex-row items-center border border-gray dark:border-opacity-15 bg-white dark:bg-dark-blue-1 dark:text-white rounded-10 px-4 py-2">
            <span>{selectedCategory}</span>
            <img
              className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 ml-2 w-4 h-4 pointer-events-none"
              loading="lazy"
              src={arrow_down}
              alt="arrow-down-icon"
            />
          </div>
          {isCategoryDropdownOpen && (
            <div className="absolute mt-2 bg-white dark:bg-dark-blue-1 dark:text-white border border-gray dark:border-opacity-15 rounded-10 z-10 w-full">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-dark-blue-2 cursor-pointer"
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
