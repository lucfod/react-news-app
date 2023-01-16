import { authAction } from "./authAction";
import { userAction } from "./userAction";
import { postAction } from "./postAction";
import { categoryAction } from "./categoryAction";
import { regionAction } from "./regionAction";
import { alertAction } from "./alertAction";

import combineActions from "../utils/combineActions";

export const rootActions = (dispatch) => {
  return combineActions(
    {
      auth: authAction,
      user: userAction,
      post: postAction,
      category: categoryAction,
      region: regionAction,
      alert: alertAction,
    },
    dispatch
  );
};
