import React from 'react';
import { ListCoins } from '../components/Dashboard';

const Dashboard = () => {
  return (
    <div className="pt-22 px-3.5 bg-white dark:bg-dark-blue-1">
      <div className="pt-6"></div>
      <ListCoins />
    </div>
  );
};

export default Dashboard;