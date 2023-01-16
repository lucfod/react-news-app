import axios from "axios";
import { BACKEND_URL } from "../Config";

const authApi = axios.create({
  baseURL: BACKEND_URL + "/auth",
  withCredentials: true,
});

authApi.defaults.withCredentials = true;
authApi.defaults.headers.common["Content-Type"] = "application/json";

export const AuthApi = {
  register: async (data) => {
    const res = await authApi.post("/register", data);
    return res;
  },

  signIn: async (data) => {
    const res = await authApi.post("/signin", data, {
      withCredentials: true,
      headers: { crossDomain: true, "Content-Type": "application/json" },
    });
    return res;
  },

  refreshToken: async () => {
    const res = await authApi.post("/refresh-token");
    return res;
  },

  signOut: async (data) => {
    const res = await authApi.post("/signout", data, {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    });
    return res;
  },
};
