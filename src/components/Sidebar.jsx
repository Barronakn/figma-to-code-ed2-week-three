import React from "react";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data/sidebarlink";
import logo from '../assets/icons/logo.png';
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.png";

const Sidebar = () => {
  const {
    activeMenu,
    setActiveMenu,
    handleClick,
    screenSize,
    currentColor,
  } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex tracking-tight"
            >
              <div className="flex flex-row gap-3 items-center justify-center">
                <div>
                  <img src={logo} alt="logo-tokena" />
                </div>
                <div>
                  <h2 className="text-dark-2">Tokena</h2>
                  <span className="text-blue">Finance app</span>
                </div>
              </div>
              
            </Link>
          </div>

          <div className="flex flex-col gap-84">
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <img src={link.icon} alt={link.name} />
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-200 rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img className="rounded-full w-8 h-8" src={avatar} />
            <p>
              <span className=" text-gray-400 text-14">John Doe</span>{" "}
              <span className="text-gray-400 text-14 font-bold ml-1">
              johndoe8@gmail.com
              </span>
            </p>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
