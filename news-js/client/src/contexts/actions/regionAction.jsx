import { RegionApi } from "../../api/region.api";
import { REGION_TYPES } from "../types/regionTypes";
import { ALERT_TYPES } from "../types/alertTypes";

export const regionAction = (dispatch) => {
  const getRegions = async (auth) => {
    try {
      const res = await RegionApi.getAll(auth);

      dispatch({
        type: REGION_TYPES.GET_REGIONS,
        payload: res.data.regions,
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

  return { getRegions };
};
