import { AUTH_TYPES } from "../types/authTypes";

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_TYPES.AUTH: {
      return {
        ...state,
        authData: action.payload,
      };
    }
    case AUTH_TYPES.ON_REGISTER:
      return {
        ...state,
        onRegister: action.payload,
      };
    case AUTH_TYPES.ON_LOGIN:
      return {
        ...state,
        onLogin: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
