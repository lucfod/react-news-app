import axios from "axios";
import { BACKEND_URL } from "../Config";

const regionApi = axios.create({
  baseURL: BACKEND_URL + "/regions",
  withCredentials: true,
});

regionApi.defaults.headers.common["Content-Type"] = "application/json";

export const RegionApi = {
  getAll: async (data) => {
    const res = await regionApi.get("", {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    });
    return res;
  },
};
