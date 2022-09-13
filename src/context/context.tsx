import { createContext, Dispatch, useContext, useReducer } from "react";
import reducer from "./reducer";

import React from "react";

export const initialState: stateProps = {
  count: 5,
  ball: new Set<string>(),
  strike: new Array(5).fill(null),
};

const ReducerContext = createContext<{
  state: stateProps;
  dispatch: Dispatch<actionProps>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface providerPros {
  children: React.ReactNode;
}

export const useReducerState = () => {
  const context = useContext(ReducerContext);
  if (!context) {
    throw new Error("Can't find AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: providerPros) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      {children}
    </ReducerContext.Provider>
  );
};
