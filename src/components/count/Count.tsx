import React from "react";
import { useAppDispatch, useAppState } from "../../context/context";
import { COUNT_DOWN_BUTTON_TEXT, COUNT_UP_BUTTON_TEXT } from "../../utils";

interface CountProps {}

export const Count: React.FC<CountProps> = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const count_up = () => dispatch({ type: "COUNT_UP" });
  const count_down = () => dispatch({ type: "COUNT_DOWN" });
  return (
    <div className="count-wrap">
      <div className="count-btn">
        <button className="down" onClick={count_down}>{COUNT_DOWN_BUTTON_TEXT}</button>
      </div>
      <div className="count">
        <span id="count" role={"contentinfo"}>
          {state.count}
        </span>
      </div>
      <div className="count-btn">
        <button className="up" onClick={count_up}>{COUNT_UP_BUTTON_TEXT}</button>
      </div>
    </div>
  );
};
