//import combineReducers from "react-combine-reducers";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import regionReducer from "./regionReducer";
import alertReducer from "./alertReducer";

import combineReducers from "../utils/combineReducers";

const authInitialState = {
  onLogin: false,
  onRegister: false,
  authData: {},
};

const userInitialState = {
  user: {},
};

const postInitialState = {
  post: {},
  posts: [],
  search: "",
  onModal: false,
  isEdit: false,
};

const categoryInitialState = {
  categories: [],
};

const regionInitialState = {
  regions: [],
};

const alertInitialState = {
  success: "",
  error: "",
};

export const [rootReducer, rootInitialState] = combineReducers({
  auth: [authReducer, authInitialState],
  post: [postReducer, postInitialState],
  user: [userReducer, userInitialState],
  category: [categoryReducer, categoryInitialState],
  region: [regionReducer, regionInitialState],
  alert: [alertReducer, alertInitialState],
});
