import React from "react";
import { Balance, ListCoins, Trending } from "../components/Dashboard";
import chevron_right from "../assets/icons/chevron-right.png";

const Dashboard = () => {
  return (
    <div className="pt-22 px-3.5 bg-white dark:bg-dark-blue-1">
      <div className="flex flex-row gap-5.5 pt-6  pb-9.5">
        <Balance />
        <div
          className="flex
          flex-col"
        >
          <div
          className="flex
          flex-row justify-between">
            <div className="pl-5.5">
              <h4 className="text-base dark:text-light-gray font-semibold">Trending</h4>
            </div>
            <div className="flex flex-row gap-0.5">
              <a className="text-xs text-dark-gray dark:text-gray text-nowrap" href="#">
                View more
              </a>
              <div>
                <img src={chevron_right} alt="chevron-right-icon" />
              </div>
            </div>
          </div>

          <div>
            <Trending />
          </div>
        </div>
      </div>
      <ListCoins />
    </div>
  );
};

export default Dashboard;
