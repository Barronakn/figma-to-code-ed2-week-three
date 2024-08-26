import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { Navbar, Sidebar } from './components';
import { Activities, Billing, Cards, Dashboard, HelpCenter, Invoces, News, Notifications, Reports, Settings } from './pages';

import { useStateContext } from './contexts/ContextProvider';
import Sign from './pages/Sign';
import Login from './pages/Login';

const App = () => {
  const { activeMenu, currentMode } = useStateContext();
  const location = useLocation();

  const hideSidebarAndNavbar = ['/sign', '/login'].includes(location.pathname);

  return (
    <div className={currentMode === 'Dark' ? 'dark': ''}>
      <div className="flex flex-col lg:flex-row relative">
        {!hideSidebarAndNavbar && (
          <>
            {activeMenu && (
              <div className="w-60 fixed sidebar z-50 bg-white pr-20">
                <Sidebar />
              </div>
            )}
            <div className={
              `bg-white min-h-screen ${activeMenu 
                ? 'md:ml-72'
                : 'flex-2'}`}
            >
              <div className="navbar shadow-sm fixed left-0 top-0 w-full z-20 px-5 lg:pl-64 lg:pr-22 bg-white dark:bg-dark-blue-1">
                <Navbar />
              </div>
            </div>
          </>
        )}

        <div className={`${hideSidebarAndNavbar ? 'w-full' : 'flex-1'} bg-white min-h-screen overflow-x-hidden`}>
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

            <Route path="/sign" element={<Sign />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default () => (
  <Router>
    <App />
  </Router>
);
