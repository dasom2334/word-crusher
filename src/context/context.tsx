import { createContext, Dispatch, useContext, useReducer } from "react";
import reducer from "./reducer";

import React from "react";

export const initialState: stateProps = {
  count: 5,
  ball: new Set<string>(),
  strike: new Array(5).fill(""),
  activeElement: null,
  result: new Promise<string[]>((resolve, reject) => {
    resolve([]);
    // reject('');
  }),
};

const StateContext = createContext<stateProps>(initialState);
const DispatchContext = createContext<Dispatch<actionProps>>(() => null);

interface providerPros {
  children: React.ReactNode;
}

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("Can't find AppProvider");
  }
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error("Can't find AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: providerPros) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
