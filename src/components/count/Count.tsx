import React from "react";
import { useReducerState } from "../../context/context";
import { reducerTypes } from "../../utils";

interface CountProps {}

export const Count: React.FC<CountProps> = () => {
  const { state, dispatch } = useReducerState();
  const count_up = () => dispatch({ type: reducerTypes.count_up });
  const count_down = () => dispatch({ type: reducerTypes.count_down });
  return (
    <div className="count_wrap">
      <div className="count_btn">
        <button onClick={count_down}>➖</button>
      </div>
      <div>
        <span id="count" role={"contentinfo"}>
          {state.count}
        </span>
      </div>
      <div className="count_btn">
        <button onClick={count_up}>➕</button>
      </div>
    </div>
  );
};
