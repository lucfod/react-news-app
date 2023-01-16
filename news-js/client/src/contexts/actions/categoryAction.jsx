import { CategoryApi } from "../../api/category.api";
import { CATEGORY_TYPES } from "../types/categoryTypes";
import { ALERT_TYPES } from "../types/alertTypes";

export const categoryAction = (dispatch) => {
  const getCategories = async (auth) => {
    try {
      const res = await CategoryApi.getAll(auth);

      dispatch({
        type: CATEGORY_TYPES.GET_CATEGORIES,
        payload: res.data.categories,
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

  return { getCategories };
};
