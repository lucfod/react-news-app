import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { useStore } from "../contexts/StoreContext";

function Header() {
  const { state, action } = useStore();
  const { authData } = state.auth;
  const { search } = state.post;
  const { searchPost } = action.post;
  const { signOut, setOnLogin, setOnRegister } = action.auth;

  const navigate = useNavigate();

  const logout = () => {
    signOut(authData);
    navigate("/");
  };

  const handleChange = (e) => {
    searchPost(e.target.value);
  };

  return (
    <>
      <header className="flex border-b border-gray-200 px-8 z-30 py-4 shadow-md bg-mkt-500">
        <div className="flex items-center justify-left">
          <a href="/" className="text-2xl font-semibold text-white">
            NewsApp
          </a>
        </div>
        <div className="container flex items-center justify-between h-full px-6 mx-auto text-gray-800">
          {/* <!-- Search input --> */}
          <div className="flex w-full justify-center">
            <div className="relative w-full max-w-xl">
              <span className="absolute text-mkt-500 dark:text-mkt-100 inset-y-0 flex items-center pl-2">
                <AiOutlineSearch className="w-4 h-4" aria-hidden="true" />
              </span>
              <input
                type="text"
                id="search"
                name="search"
                value={search}
                className="border-2 rounded-md w-full py-2 pl-8 text-sm focus:outline-none dark:text-gray-300 focus:border-mkt-400 dark:border-gray-600 dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700"
                placeholder="Search Posts"
                aria-label="Search"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-right text-white px-6">
          <ul className="flex items-center justify-center flex-shrink-0 space-x-4">
            <li className="relative">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "flex cursor-pointer rounded-full border-2 p-1 " +
                  (isActive
                    ? "border-white bg-white text-mkt-500"
                    : "text-white border-mkt-500 hover:border-white")
                }
              >
                <AiFillHome className="h-6 w-6" />
              </NavLink>
            </li>
            {authData && authData.token ? (
              <>
                <li className="relative">
                  <NavLink
                    to={`/profiles/${authData.user.id}`}
                    className={({ isActive }) =>
                      "flex cursor-pointer rounded-full border-2 p-1 " +
                      (isActive
                        ? "border-white bg-white text-mkt-500"
                        : "text-white border-mkt-500 hover:border-white")
                    }
                  >
                    <FaUserAlt className="h-6 w-6" />
                  </NavLink>
                </li>
                <li
                  className="relative cursor-pointer hover:underline"
                  onClick={logout}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <li
                  className="relative cursor-pointer hover:underline"
                  onClick={() => setOnLogin(true)}
                >
                  Login
                </li>
                <li
                  className="relative cursor-pointer hover:underline"
                  onClick={() => setOnRegister(true)}
                >
                  SignUp
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
