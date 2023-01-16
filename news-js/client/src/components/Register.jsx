import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";
import validateAuth from "../utils/validateAuth";

function Register() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});

  const { state, action } = useStore();
  const { authData } = state.auth;
  const { register, setOnRegister, setOnLogin } = action.auth;

  useEffect(() => {
    if (authData) navigate.push("/");
  }, [authData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(validateAuth(e, input));
  };

  const handleBlur = (e) => {
    setError(validateAuth(e, input));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(input);
    setOnRegister(false);
    setOnLogin(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOnRegister(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setOnRegister(false);
    setOnLogin(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-gray-800 bg-opacity-50 sm:items-center sm:justify-center">
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
            <h2 className="p-4 text-center text-3xl font-bold tracking-tight text-white">
              Registration
            </h2>
          </div>
          <div className="bg-white py-6 px-4 space-y-6 rounded-b-md">
            <div className="-space-y-px rounded-md">
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="firstName"
                  value={input.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="First Name"
                />
                {error.firstName && (
                  <span className="text-red-500 text-sm">
                    {error.firstName}
                  </span>
                )}
              </div>
            </div>
            <div className="-space-y-px rounded-md">
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="lastName"
                  value={input.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Last Name"
                />
                {error.lastName && (
                  <span className="text-red-500 text-sm">{error.lastName}</span>
                )}
              </div>
            </div>
            <div className="-space-y-px rounded-md">
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={input.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
                {error.email && (
                  <span className="text-red-500 text-sm">{error.email}</span>
                )}
              </div>
            </div>

            <div className="-space-y-px rounded-md">
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
                {error.password && (
                  <span className="text-red-500 text-sm">{error.password}</span>
                )}
              </div>
            </div>

            <div className="-space-y-px rounded-md">
              <div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
                {error.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {error.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={
                  !Object.values(error).every((x) => x === null || x === "") ||
                  !Object.values(input).every((x) => x != null && x != "")
                }
                className={
                  "group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white" +
                  (!Object.values(error).every((x) => x === null || x === "") ||
                  !Object.values(input).every((x) => x != null && x != "")
                    ? " bg-indigo-200 cursor-not-allowed"
                    : " bg-indigo-600  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2")
                }
              >
                Save
              </button>
            </div>
            <div>
              <span className="text-gray-900 text-sm">
                You already have an account?
              </span>
              <button
                type="button"
                onClick={handleLogin}
                className="mx-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
