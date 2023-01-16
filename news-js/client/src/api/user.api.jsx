import axios from "axios";
import { BACKEND_URL } from "../Config";

const userApi = axios.create({
  baseURL: BACKEND_URL + "/users",
  withCredentials: true,
});

userApi.defaults.headers.common["Content-Type"] = "application/json";

export const UserApi = {
  get: async (data, auth) => {
    const res = await userApi.get("/" + data, {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    return res;
  },
  getPosts: async (data, auth) => {
    const res = await userApi.get("/posts/" + data, {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    return res;
  },
};
