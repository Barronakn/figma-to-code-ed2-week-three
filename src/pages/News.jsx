import React from "react";
import { Link } from "react-router-dom";
import CoinMarketCard from "../components/News/CoinMarketCard";
import arrow_down from "../assets/icons/arrow-down.png";

const News = () => {
  return (
    <div className="border border-gray p-6 pt-22 dark:bg-black">
      <h3 className="text-base font-semibold mb-8 dark:text-white">Latest crypto news</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mb-5 mt-22">
        <CoinMarketCard />
        <CoinMarketCard />
        <CoinMarketCard />
        <CoinMarketCard />
        <CoinMarketCard />
        <CoinMarketCard />
        <CoinMarketCard />
        <CoinMarketCard />
      </div>
      <Link className="text-center" to="#">
        <div class="flex flex-row mx-auto my-0 w-fit items-center gap-1 py-2.5 px-3.5  rounded-100 text-sm bg-gray bg-opacity-50">
          <span>Learn more</span>
          <img src={arrow_down} alt="arrow_down-icon" />
        </div>
      </Link>
    </div>
  );
};

export default News;
