import React from "react";
import coin_market from '../../assets/icons/coin_market.png';
import comment_icon from '../../assets/icons/comment.png';
import heart from '../../assets/icons/heart.png';

const CoinMarketCard = () => {
  return (
    <section className="flex flex-col gap-2.5 p-2.5">
      <div className="flex flex-row gap-2 items-center">
        <div>
          <img src={coin_market} alt="coinmarket-icon" />
        </div>
        <div>
          <p className="text-xs dark:text-white font-semibold">CoinMarketCap</p>
          <span className="text-xs text-dark-gray">News - 7 hours ago</span>
        </div>
      </div>

      <div className="bg-light-gray h-48.5 w-64.5 rounded-10"></div>

      <div className="flex flex-col gap-1.5">
        <h4 className="text-xs italic font-semibold">Ethereum’s Merge Coming and the Stakes Couldn’t Be Higher</h4>
        <p className="text-xs font-medium">The most important upgrade in blockchain history is slated for August. And the outcome of Ethe....</p>
        <div className="flex flex-row gap-2.5">
          <div className="flex flex-row gap-1">
            <img src={heart} alt="heart-icon" />
            <span className="text-sm font-medium">5</span>
          </div>
          <div className="flex flex-row gap-1">
            <img src={comment_icon} alt="comment-icon" />
            <span className="text-sm font-medium">5</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinMarketCard;
