import { React, createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

import { rootActions } from "./actions/index";
import { rootReducer, rootInitialState } from "./reducers/index";

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("There is no Store Provider");

  return context;
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(rootReducer, rootInitialState);
  const action = rootActions;

  return (
    <StoreContext.Provider value={{ state, dispatch, action }}>
      {props.children}
    </StoreContext.Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.array.isRequired,
};
