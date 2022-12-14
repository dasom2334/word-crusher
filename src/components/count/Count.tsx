import React, { MouseEvent, MouseEventHandler } from "react";
import { useAppDispatch, useAppState } from "../../context/context";
import {
  allInputClear,
  COUNT_DOWN_BUTTON_TEXT,
  COUNT_MAX,
  COUNT_MIN,
  COUNT_UP_BUTTON_TEXT,
  putClassForAwhile,
} from "../../utils";

interface CountProps {}

export const Count: React.FC<CountProps> = React.memo(() => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const count_up: MouseEventHandler<HTMLButtonElement> = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    if (state.count >= COUNT_MAX) {
      putClassForAwhile(event.currentTarget, "shaking");
      return;
    }
    dispatch({ type: "COUNT_UP" });
    allInputClear();
  };
  const count_down: MouseEventHandler<HTMLButtonElement> = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    if (state.count <= COUNT_MIN) {
      putClassForAwhile(event.currentTarget, "shaking");
      return;
    }
    dispatch({ type: "COUNT_DOWN" });
    allInputClear();
  };
  return (
    <div className="count-wrap">
      <div className="count-btn">
        <button className="down" onClick={count_down}>
          {COUNT_DOWN_BUTTON_TEXT}
        </button>
      </div>
      <div className="count">
        <span id="count" role={"contentinfo"}>
          {state.count}
        </span>
      </div>
      <div className="count-btn">
        <button className="up" onClick={count_up}>
          {COUNT_UP_BUTTON_TEXT}
        </button>
      </div>
    </div>
  );
});
