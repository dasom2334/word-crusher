import { createContext, Dispatch, useContext, useReducer } from "react";
import reducer, { actionProps, stateProps } from "./reducer";

import React from "react";

export const initialState: stateProps = {
  count: 5,
  ball: new Set<string>(),
  strike: [],
  results: [],
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
