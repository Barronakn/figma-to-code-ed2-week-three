import React from "react";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data/sidebarlink";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.png";
import chevron_down from "../assets/icons/chevron-down.png";
import login from "../assets/icons/login.png";
import sign from "../assets/icons/sign.png";
import Logo from "./Logo";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, handleClick, screenSize, currentColor } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="p-3.5 h-screen hover:overflow-y-auto overflow-y-hidden dark:text-white  dark:bg-dark-blue-1 z-50 border-r border-r-gray">
      {activeMenu && (
        <div className="flex flex-col gap-9">
          <Link
            to="/dashboard"
            onClick={handleCloseSideBar}
            className="flex items-center gap-3 rounded-10 mt-4 px-4 py-3 bg-blue bg-opacity-7"
          >
            <Logo />
          </Link>

          <div className="flex flex-col gap-84">
            <div className="flex flex-col gap-0.5">
              {links.map((item) => (
                <div key={item.title}>
                  <p className="text-dark-gray text-sm font-medium mb-5">
                    {item.title}
                  </p>
                  {item.links.map((link) => (
                    <NavLink
                      to={`/${link.name}`}
                      key={link.name}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : "",
                      })}
                      className={({ isActive }) =>
                        isActive
                          ? "flex flex-row justify-between items-center text-xs font-bold px-2 py-3 text-white rounded-10"
                          : "flex flex-row justify-between text-xs font-medium rounded-10 px-2 dark:text-white py-3"
                      }
                    >
                      <div className="flex flex-row items-center gap-1.5">
                        <img src={link.icon} alt={link.name} />
                        <span className="capitalize  dark:text-white">{link.name}</span>
                      </div>
                      {link.chevron && (
                        <div>
                          <img src={link.chevron} alt={link.name} />
                        </div>
                      )}
                    </NavLink>
                  ))}
                </div>
              ))}

              <div>
                <NavLink
                  to="/sign"
                  className="flex flex-row justify-between items-center text-xs font-bold px-2 py-3 hover:bg-blue hover:text-white rounded-10"
                >
                  <div className="flex flex-row items-center gap-1.5">
                    <div>
                      <img className="w-5 h-5" src={sign} alt="Sign-icon" />
                    </div>
                    <span className="dark:text-white">Sign</span>
                  </div>
                </NavLink>
                <NavLink
                  to="/login"
                  className="flex flex-row justify-between items-center text-xs font-bold px-2 py-3 hover:bg-blue hover:text-white rounded-10"
                >
                  <div className="flex flex-row items-center gap-1.5">
                    <div>
                      <img className="w-4 h-4" src={login} alt="Login-icon" />
                    </div>
                    <span className="dark:text-white">Login</span>
                  </div>
                </NavLink>
              </div>
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleClick("userProfile")}
            >
              <div className="flex flex-row gap-2">
                <div>
                  <img className="rounded-full w-8 h-8" src={avatar} />
                </div>
                <div>
                  <p className="text-xs font-medium dark:text-white">John Doe</p>
                  <span className="text-dark-gray text-xs">
                    johndoe8@gmail.com
                  </span>
                </div>
              </div>
              <div>
                <img src={chevron_down} alt="chevron_down-icon" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
