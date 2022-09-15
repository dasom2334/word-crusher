import React, { ChangeEvent, useState } from "react";
import { useReducerState } from "../../context/context";
import {
  ActionTypes,
  isIncludesNotAlphabet,
  isLenthOverThenOne,
} from "../../utils";

interface BallProps {}

export const Ball: React.FC<BallProps> = ({}) => {
  const { state, dispatch } = useReducerState();
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isLenthOverThenOne(event.currentTarget.value)) {
      event.currentTarget.value = event.currentTarget.value.slice(0, 1);
    }
    if (isIncludesNotAlphabet(event.currentTarget.value)) {
      event.currentTarget.value = "";
    }
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (/^[a-zA-Z]{1}$/.test(event.key)) {
      if ([...state.ball].includes(event.key)) {
        // set style!
      } 
      const balls = new Set([...state.ball, event.currentTarget.value]);
      dispatch({ actionType: ActionTypes.ball, ball: balls });
      event.currentTarget.value = "";
    }
  };

  return (
    <div className="ball-wrap">
      <div className="ball-tagsinput-wrap">
        <div className="ball-tags" data-testid="ball-tags">{state.ball}</div>
        <input
          name="ball-tagsinput"
          aria-label="ball-tagsinput"
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          maxLength={1}
        />
      </div>
    </div>
  );
};
