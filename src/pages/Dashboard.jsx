import { Balance, ListCoins, Trending } from "../components/Dashboard";

const Dashboard = () => {
  return (
    <div className="absolute left-0 pt-22 w-full lg:pl-72 lg:pr-16 px-5 bg-white dark:bg-dark-blue-1">
      <div className="container">
        <div className="flex flex-col xl:flex-row gap-5.5 pt-6 pb-9.5">
          <Balance />
          <Trending />
        </div>
        <ListCoins />
      </div>
    </div>
  );
};

export default Dashboard;
