import React from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mx-auto sm:max-w-xl max-w-72 p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
      <Link className="flex flex-row items-center gap-3 rounded-10 mt-4 px-4 py-3 bg-blue bg-opacity-7 w-fit mx-auto my-0" to="/dashboard">
          <Logo />
      </Link>
      <div className="text-sm font-light text-center text-[#6B7280] py-8 ">
        Login to your account on Tokena.
      </div>
      <form className="flex flex-col">
        <div className="pb-2">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-[#000000]"
          >
            Email
          </label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span>
            <input
              type="email"
              name="email"
              id="email"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
              placeholder="name@company.com"
              autocomplete="off"
            />
          </div>
        </div>
        <div className="pb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-[#000000]"
          >
            Password
          </label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-square-asterisk"
              >
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M12 8v8"></path>
                <path d="m8.5 14 7-4"></path>
                <path d="m8.5 10 7 4"></path>
              </svg>
            </span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••••"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
              autocomplete="new-password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-[#FFFFFF] bg-[#006EFF] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
        >
          Login
        </button>
        <div className="text-sm font-light text-center text-[#6B7280] ">
          Don't have an accout yet?{" "}
          <a href="/sign" className="font-medium text-[#006EFF] hover:underline">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
