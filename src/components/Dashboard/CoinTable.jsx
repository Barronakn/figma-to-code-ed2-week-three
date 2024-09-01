import React from "react";
import star from "../../assets/icons/star.png";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import ellipsis from "../../assets/icons/ellipsis.png";
import chevron_up_down from "../../assets/icons/chevron-up-down.png";

const CoinTable = ({
  currentItems = [],
  currentPage,
  itemsPerPage,
  totalPages,
  paginate,
  filteredCoins = [],
  openModal,
  indexOfFirstItem,
  indexOfLastItem,
  getSparklineColor,
}) => {
  return (
    <div className="bg-white dark:bg-dark-blue-1 dark:text-white shadow-md rounded-10 border border-gray dark:border-opacity-15">
      <div className="flex flex-row items-center justify-between border-b border-b-gray dark:border-opacity-15 p-4">
        <div>
          <h3 className="text-base font-semibold">Market</h3>
        </div>
        <div className="cursor-pointer border border-gray dark:border-opacity-15 px-5 py-2.5 rounded-10">
          <img
            className="dark:filter dark:invert dark:brightness-0 dark:contrast-100  pointer-events-none"
            loading="lazy"
            src={ellipsis}
            alt="ellipsis-icon"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-dark-blue-1 font-medium text-sm">
          <thead className="bg-gray dark:text-light-gray dark:bg-opacity-10">
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
            {currentItems.map((coin, index) => (
              <tr
                className="border-b border-b-gray dark:border-opacity-15"
                key={coin.id}
              >
                <td className="py-3 pl-6">
                  <img
                    className="dark:filter dark:invert dark:brightness-0 dark:contrast-100  pointer-events-none"
                    loading="lazy"
                    src={star}
                    alt="star-icon"
                  />
                </td>
                <td className="py-3 px-6">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </td>
                <td className="py-3 px-6 flex flex-row gap-2.5 items-center">
                  <img
                    className="w-6 h-6 mr-2 pointer-events-none"
                    loading="lazy"
                    src={coin.image}
                    alt={coin.name}
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
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td className="py-3 px-6 text-right">
                  ${coin.total_volume.toLocaleString()}
                </td>
                <td className="py-3 px-6 text-right">
                  ${coin.market_cap.toLocaleString()}
                </td>
                <td className="py-3 px-6 text-right">
                  <Sparklines data={coin.sparkline_in_7d.price || []}>
                    <SparklinesLine
                      style={{
                        strokeWidth: 1,
                        stroke: getSparklineColor(
                          coin.sparkline_in_7d.price || []
                        ),
                        fill: "none",
                      }}
                    />
                    <SparklinesSpots
                      style={{
                        stroke: getSparklineColor(
                          coin.sparkline_in_7d.price || []
                        ),
                        fill: getSparklineColor(
                          coin.sparkline_in_7d.price || []
                        ),
                      }}
                    />
                  </Sparklines>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-row justify-center sm:justify-between items-center py-4 px-6">
          <button
            className="px-4 py-2 text-gray-700 dark:text-white bg-white dark:bg-dark-blue-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          <div className="flex flex-row w-fit sm:gap-1.5">
            <button
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-blue rounded-10 text-white"
                  : "bg-white text-gray-700 dark:bg-dark-blue-1 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => paginate(1)}
            >
              1
            </button>

            {currentPage > 3 && <span className="px-2">...</span>}

            {Array.from({ length: 3 }, (_, i) => {
              const pageNumber = currentPage - 1 + i;
              if (pageNumber > 1 && pageNumber < totalPages) {
                return (
                  <button
                    key={pageNumber}
                    className={`px-2 sm:px-4 py-1 sm:py-2  rounded-lg ${
                      currentPage === pageNumber
                        ? "bg-blue rounded-10 text-white"
                        : "bg-white text-gray-700 dark:bg-dark-blue-1 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}

            {currentPage < totalPages - 2 && <span className="px-2">...</span>}

            <button
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-blue rounded-10 text-white"
                  : "dark:bg-dark-blue-1 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => paginate(totalPages)}
            >
              {totalPages}
            </button>
          </div>

          <button
            className="px-4 py-2 text-gray-700 dark:text-white bg-white dark:bg-dark-blue-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}

      <div className="flex flex-row justify-between items-center py-4 px-6 text-sm text-gray-700 dark:text-white">
        <div>
          Showing {indexOfFirstItem <= 0 ? 1 : indexOfFirstItem + 1} to{" "}
          {indexOfLastItem} of {filteredCoins.length} results
        </div>
        <div className="flex flex-row gap-0.5 items-center cursor-pointer border border-gray dark:border-opacity-15 p-2 rounded-10 px-5 py-2.5">
          <span className="text-gray text-xs font-medium">Rows</span>
          <img
            className="dark:filter dark:invert dark:brightness-0 dark:contrast-100  pointer-events-none"
            loading="lazy"
            src={chevron_up_down}
            alt="chevron-up-down-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default CoinTable;
