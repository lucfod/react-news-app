import { REGION_TYPES } from "../types/regionTypes";

const regionReducer = (state, action) => {
  switch (action.type) {
    case REGION_TYPES.GET_REGIONS:
      return {
        ...state,
        regions: action.payload,
      };
    default:
      return state;
  }
};

export default regionReducer;
