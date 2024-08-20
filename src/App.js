import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import { Navbar, Footer, Sidebar } from './components';
import { Activities, Billing, Cards, Dashboard, HelpCenter, Invoces, News, Notifications, Reports, Settings} from './pages';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { activeMenu, themeSettings, currentMode } = useStateContext();

  return (
    <div className={currentMode === 'Dark' ? 'dark': ''}>
      <Router>
        <div className="flex relative">
          {activeMenu ? (
            <div className="w-72 fixed sidebar bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0">
              <Sidebar />
            </div>
          )}
          <div className={
            `bg-white min-h-screen  w-full ${activeMenu 
              ? 'md:ml-72'
              : 'flex-2'}`}
          >
            <div className="fixed md:static bg-white navbar w-full">
              <Navbar />
            </div>
          

            <div>
              <Routes>
                <Route path="/" element={<Dashboard />} />
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