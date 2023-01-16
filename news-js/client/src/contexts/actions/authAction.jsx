// import { useState, useEffect } from "react";
import { AuthApi } from "../../api/auth.api";
import { AUTH_TYPES } from "../types/authTypes";
import { ALERT_TYPES } from "../types/alertTypes";

// function useStorageAuth() {
//   const key = "auth";

//   const [authData, setAuthData] = useState(
//     JSON.parse(localStorage.getItem(key))
//   );

//   // update stored theme
//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(authData));
//   }, [authData, key]);

//   return [authData, setAuthData];
// }

const keyStorage = "auth";

export const authAction = (dispatch) => {
  // const [authData, setAuthData] = useStorageAuth();
  // const [onLogin, setOnLogin] = useState(false);
  // const [onRegister, setOnRegister] = useState(false);

  const register = async (data) => {
    try {
      const res = await AuthApi.register(data);

      dispatch({
        type: ALERT_TYPES.ALERT_SUCCESS,
        payload: {
          success: res.data.message,
        },
      });

      setOnRegister(false);
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();

      dispatch({
        type: ALERT_TYPES.ALERT_ERROR,
        payload: { error: errorMessage },
      });
    }
  };

  const signIn = async (data) => {
    try {
      const res = await AuthApi.signIn(data);

      localStorage.setItem(keyStorage, true);

      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: {
          user: res.data.user,
          token: res.data.token,
        },
      });

      setOnLogin(false);
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();

      dispatch({
        type: ALERT_TYPES.ALERT_ERROR,
        payload: errorMessage,
      });
    }
  };

  const signOut = async (data) => {
    try {
      localStorage.removeItem(keyStorage);

      const res = await AuthApi.signOut(data);

      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: null,
      });

      dispatch({
        type: ALERT_TYPES.ALERT_SUCCESS,
        payload: res.data.message,
      });
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();

      dispatch({
        type: ALERT_TYPES.ALERT_ERROR,
        payload: errorMessage,
      });
    }
  };

  const refreshToken = async () => {
    try {
      const item = localStorage.getItem(keyStorage);
      if (item) {
        const res = await AuthApi.refreshToken();

        dispatch({
          type: AUTH_TYPES.AUTH,
          payload: {
            user: res.data.user,
            token: res.data.token,
          },
        });
      }
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();

      dispatch({
        type: ALERT_TYPES.ALERT_ERROR,
        payload: errorMessage,
      });
    }
  };

  const setOnLogin = (show) => {
    dispatch({
      type: AUTH_TYPES.ON_LOGIN,
      payload: show,
    });
  };

  const setOnRegister = (show) => {
    dispatch({
      type: AUTH_TYPES.ON_REGISTER,
      payload: show,
    });
  };

  return { setOnLogin, setOnRegister, register, signIn, signOut, refreshToken };
};
