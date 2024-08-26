import React from "react";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data/sidebarlink";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.png";
import chevron_down from "../assets/icons/chevron-down.png";
import login from "../assets/icons/login.png";
import sign from "../assets/icons/sign.png";
import close_menu from "../assets/icons/close.png";
import Logo from "./Logo";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, toggleMenu, handleClick, screenSize } =
    useStateContext();
  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="p-3.5 h-screen hover:overflow-y-auto overflow-y-hidden dark:text-white dark:bg-dark-blue-1 w-60 shadow-md">
      {activeMenu && (
        <div className="fixed inset-0 bg-black w-auto lg:w-60 bg-opacity-0 z-50 justify-end">
          <div className="flex flex-col bg-white w-60 p-3.5 gap-9 z-0 h-screen hover:overflow-y-auto overflow-y-hidden dark:text-white dark:bg-dark-blue-1 ">
            <Link
              to="/dashboard"
              onClick={handleCloseSideBar}
              className="flex items-center gap-3 rounded-10 mt-4 px-4 py-3 bg-blue bg-opacity-7"
            >
              <Logo />
            </Link>

            <div onClick={toggleMenu} className="block lg:hidden">
              <img src={close_menu} alt="close-menu-icon" />
            </div>

            <div className="flex flex-col gap-84">
              <div className="flex flex-col my-0.5">
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
                        className={({ isActive }) =>
                          isActive
                            ? "flex flex-row bg-blue bg-opacity-70 justify-between items-center text-xs font-bold text-white px-2 py-3 rounded-10"
                            : "flex flex-row hover:bg-blue dark:hover:bg-opacity-70 justify-between text-xs font-medium rounded-10 px-2 py-3 hover:font-bold dark:text-white"
                        }
                      >
                        <div className="flex flex-row items-center gap-1.5">
                          <NavLink
                            to={`/${link.name}`}
                            className={({ isActive }) =>
                              isActive
                                ? "filter invert brightness-0 contrast-200 pointer-events-none"
                                : "dark:filter dark:invert dark:brightness-0 dark:contrast-200 pointer-events-none"
                            }
                          >
                            <img
                              className=""
                              loading="lazy"
                              src={link.icon}
                              alt={link.name}
                            />
                          </NavLink>
                          <span className="capitalize">{link.name}</span>
                        </div>
                        {link.chevron && (
                          <NavLink
                            to={`/${link.name}`}
                            className={({ isActive }) =>
                              isActive
                                ? "filter invert brightness-0 contrast-200 pointer-events-none"
                                : ""
                            }
                          >
                            <img
                              className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 pointer-events-none"
                              loading="lazy"
                              src={link.chevron}
                              alt={link.name}
                            />
                          </NavLink>
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
                        <img
                          className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 w-5 h-5 pointer-events-none"
                          loading="lazy"
                          src={sign}
                          alt="Sign-icon"
                        />
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
                        <img
                          className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 w-4 h-4  pointer-events-none"
                          loading="lazy"
                          src={login}
                          alt="Login-icon"
                        />
                      </div>
                      <span className="dark:text-white">Login</span>
                    </div>
                  </NavLink>
                </div>
              </div>

              <div
                className="dark:bg-dark-blue-2 flex items-center dark:p-2 dark:rounded-10 gap-2 cursor-pointer"
                onClick={() => handleClick("userProfile")}
              >
                <div className="flex flex-row gap-2">
                    <img
                      className="rounded-full w-8 h-8 pointer-events-none"
                      loading="lazy"
                      src={avatar}
                      alt="avatar"
                    />
                  <div>
                    <p className="text-xs font-medium dark:text-white">
                      John Doe
                    </p>
                    <span className="text-dark-gray text-xs">
                      johndoe8@gmail.com
                    </span>
                  </div>
                </div>
                <div>
                  <img
                    className="dark:filter dark:invert dark:brightness-0 dark:contrast-100 pointer-events-none"
                    loading="lazy"
                    src={chevron_down}
                    alt="chevron_down-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
