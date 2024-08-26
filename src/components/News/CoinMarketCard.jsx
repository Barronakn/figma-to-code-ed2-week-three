import React from "react";
import coin_market from '../../assets/icons/coin_market.png';
import comment_icon from '../../assets/icons/comment.png';
import heart from '../../assets/icons/heart.png';

const CoinMarketCard = () => {
  return (
    <section className="flex flex-col gap-2.5 p-2.5 dark:bg-dark-blue-2 rounded-xl">
      <div className="flex flex-row gap-2 items-center">
        <div>
          <img className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 pointer-events-none" loading="lazy" src={coin_market} alt="coinmarket-icon" />
        </div>
        <div>
          <p className="text-xs font-semibold dark:text-white">CoinMarketCap</p>
          <span className="text-xs dark:text-light-gray text-dark-gray">News - 7 hours ago</span>
        </div>
      </div>

      <div>
        <div className="bg-light-gray dark:bg-dark-blue-1 dark:bg-opacity-70 h-48.5 w-54 rounded-10"></div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h4 className="text-xs italic font-semibold dark:text-white">Ethereum’s Merge Coming and the Stakes Couldn’t Be Higher</h4>
        <p className="text-xs font-medium dark:text-white">The most important upgrade in blockchain history is slated for August. And the outcome of Ethe....</p>
        <div className="flex flex-row gap-2.5">
          <div className="flex flex-row gap-1">
            <img className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 pointer-events-none" loading="lazy" src={heart} alt="heart-icon" />
            <span className="text-sm font-medium dark:text-white">5</span>
          </div>
          <div className="flex flex-row gap-1">
            <img className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 pointer-events-none" loading="lazy" src={comment_icon} alt="comment-icon" />
            <span className="text-sm font-medium dark:text-white">5</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinMarketCard;
