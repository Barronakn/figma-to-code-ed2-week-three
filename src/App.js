import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import { Navbar, Footer, Sidebar } from './components';
import { Activities, Billing, Cards, Dashboard, HelpCenter, Invoces, News, Notifications, Reports, Settings} from './pages';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { activeMenu, currentMode } = useStateContext();

  return (
    <div className={currentMode === 'Dark' ? 'dark': 'overflow-x-hidden'}>
      <Router>
        <div className="flex relative">
          {activeMenu ? (
            <div className="w-72 fixed sidebar z-50 bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 z-50">
              <Sidebar />
            </div>
          )}
          <div className={
            `bg-white min-h-screen ${activeMenu 
              ? 'md:ml-72'
              : 'flex-2'}`}
          >
            <div className="navbar fixed left-0 w-full z-40 pl-72 pr-22 bg-white dark:bg-dark-blue-1">
              <Navbar />
            </div>
          

            <div>
              <Routes>
                <Route path="/*" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/news" element={<News />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/invoces" element={<Invoces />} />
                <Route path="/help center" element={<HelpCenter />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App