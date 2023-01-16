import axios from "axios";
import { BACKEND_URL } from "../Config";

const postApi = axios.create({
  baseURL: BACKEND_URL + "/posts",
  withCredentials: true,
});

postApi.defaults.headers.common["Content-Type"] = "application/json";

export const PostApi = {
  getAll: async () => {
    const res = await postApi.get();
    return res;
  },

  get: async (data, auth) => {
    const res = await postApi.get("/" + data, {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    return res;
  },

  create: async (data, auth) => {
    const res = await postApi.post("/", data, {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    return res;
  },

  update: async (data, auth) => {
    const res = await postApi.patch("/" + data.id, data, {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    return res;
  },

  delete: async (data, auth) => {
    const res = await postApi.delete("/" + data, {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    return res;
  },
};
