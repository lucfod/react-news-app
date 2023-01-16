import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useStore } from "../contexts/StoreContext";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [typePass, setTypePass] = useState(false);

  const { action } = useStore();
  const { signIn, setOnLogin, setOnRegister } = action.auth;

  const handleClose = (e) => {
    e.preventDefault();
    setOnLogin(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setOnLogin(false);
    setOnRegister(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(userData);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end bg-gray-800 bg-opacity-50 sm:items-center sm:justify-center">
      <div className="flex h-full w-full items-center justify-center p-8 overflow-auto">
        <form
          className="w-full max-w-md m-auto rounded-md shadow-md shadow-gray-500"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="relative bg-mkt-500 rounded-t-md">
            <button
              type="button"
              className="absolute right-0 m-2 rounded-full border-2 border-white hover:bg-white"
              onClick={handleClose}
            >
              <span className="w-6 h-6 p-2 text-white hover:text-mkt-500">
                X
              </span>
            </button>
            <h2 className="p-6 text-center text-3xl font-bold tracking-tight text-white">
              Login
            </h2>
          </div>
          <div className="bg-white py-6 px-4 space-y-8 rounded-b-md">
            <div className="-space-y-px rounded-md">
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div className="-space-y-px rounded-md">
              <div className="relative">
                <input
                  type={typePass ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
                <small
                  className="absolute cursor-pointer text-mkt-500 dark:text-mkt-100 inset-y-0 flex right-2 items-center pl-2"
                  onClick={() => setTypePass(!typePass)}
                >
                  {!typePass ? (
                    <AiFillEyeInvisible
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <AiFillEye className="w-5 h-5" aria-hidden="true" />
                  )}
                </small>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={userData.email && userData.password ? false : true}
                className={
                  "group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white " +
                  (userData.email && userData.password
                    ? " cursor-pointer bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    : " cursor-not-allowed bg-indigo-200")
                }
              >
                Sign In
              </button>
            </div>
            <div>
              <span className="text-gray-900 text-sm">Need an account?</span>
              <button
                type="button"
                onClick={handleRegister}
                className="mx-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
