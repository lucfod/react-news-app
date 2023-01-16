import { ALERT_TYPES } from "../types/alertTypes";

export const alertAction = (dispatch) => {
  const setAlertSuccess = async (data) => {
    dispatch({
      type: ALERT_TYPES.ALERT_SUCCESS,
      payload: data,
    });
  };

  const setAlertError = async (data) => {
    dispatch({
      type: ALERT_TYPES.ALERT_ERROR,
      payload: data,
    });
  };

  return { setAlertSuccess, setAlertError };
};
