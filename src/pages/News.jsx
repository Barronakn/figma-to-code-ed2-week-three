import React from "react";
import { Link } from "react-router-dom";
import CoinMarketCard from "../components/News/CoinMarketCard";
import arrow_down from "../assets/icons/arrow-down.png";

const News = () => {
  return (
    <div className="absolute left-0 w-full sm:px-10 px-5 lg:pl-72 lg:pr-16 p-6 pt-22 dark:bg-dark-blue-1">
      <div className="container">
      <h3 className="text-base font-semibold mb-8 dark:text-white">Latest crypto news</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
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
        <div class="flex flex-row mx-auto my-0 w-fit items-center gap-1 py-2.5 px-3.5  rounded-100 text-sm bg-gray bg-opacity-50 dark:bg-dark-blue-2">
          <span className="dark:text-white">Learn more</span>
          <img className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 pointer-events-none" loading="lazy" src={arrow_down} alt="arrow_down-icon" />
        </div>
      </Link>
      </div>
    </div>
  );
};

export default News;
