import { UserApi } from "../../api/user.api";
import { ALERT_TYPES } from "../types/alertTypes";
import { USER_TYPES } from "../types/userTypes";

export const userAction = (dispatch) => {
  const getUser = async (data, auth) => {
    try {
      const resUser = await UserApi.get(data, auth);

      dispatch({ type: USER_TYPES.GET_USER, payload: resUser.data.user });
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

  return { getUser };
};
