import { ALERT_TYPES } from "../types/alertTypes";

const alertReducer = (state, action) => {
  switch (action.type) {
    case ALERT_TYPES.ALERT_SUCCESS:
      return { ...state, success: action.payload };
    case ALERT_TYPES.ALERT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default alertReducer;
