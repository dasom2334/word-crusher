import "./Count.css";
import React from "react";
import { useAppDispatch, useAppState } from "../../context/context";

interface CountProps {}

export const Count: React.FC<CountProps> = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const count_up = () => dispatch({ type: "COUNT_UP" });
  const count_down = () => dispatch({ type: "COUNT_DOWN" });
  return (
    <div className="count_wrap">
      <div className="count_btn">
        <button onClick={count_down}>➖</button>
      </div>
      <div className="count">
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
