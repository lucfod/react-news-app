import axios from "axios";
import { BACKEND_URL } from "../Config";

const categoryApi = axios.create({
  baseURL: BACKEND_URL + "/categories",
  withCredentials: true,
});

categoryApi.defaults.headers.common["Content-Type"] = "application/json";

export const CategoryApi = {
  getAll: async (data) => {
    const res = await categoryApi.get("", {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    });
    return res;
  },
};
