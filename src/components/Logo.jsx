import React from "react";
import logo from "../assets/icons/logo.png";

const Logo = () => {
  return (
    <div className="flex flex-row gap-3 items-center justify-center">
      <div>
        <img className="pointer-events-none" loading="lazy" src={logo} alt="logo-tokena" />
      </div>
      <div>
        <h2 className="text-dark-2 text-xs font-bold">Tokena</h2>
        <span className="text-blue text-xxs font-medium">Finance app</span>
      </div>
    </div>
  );
};

export default Logo;
