import React, { ChangeEvent, FocusEvent, useRef } from "react";
import { useReducerState } from "../../context/context";
import {
  ActionTypes,
  isIncludesNotAlphabet,
  isLenthOverThenOne,
} from "../../utils";

interface BallProps {}

export const Ball: React.FC<BallProps> = ({}) => {
  const { state, dispatch } = useReducerState();

  const ballInput = useRef(null);

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    dispatch({
      actionType: ActionTypes.ball,
      ball: state.ball,
      activeElement: ballInput.current,
    });
    // if (isLenthOverThenOne(event.currentTarget.value)) {
    //   event.currentTarget.value = event.currentTarget.value.slice(0, 1);
    // }
    // if (isIncludesNotAlphabet(event.currentTarget.value)) {
    //   event.currentTarget.value = "";
    // }
    // if (/^[a-zA-Z]{1}$/.test(event.currentTarget.value)) {
    //   if ([...state.ball].includes(event.currentTarget.value)) {
    //     // set style!
    //   }
    //   const balls = new Set([...state.ball, event.currentTarget.value]);
    //   dispatch({
    //     actionType: ActionTypes.ball,
    //     ball: balls,
    //     activeElement: ballInput.current,
    //   });
    //   event.currentTarget.value = "";
    // }
  };
  const onChange = (event:ChangeEvent<HTMLInputElement>) => {
    // const onChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("kyup");
    if (isLenthOverThenOne(event.currentTarget.value)) {
      event.currentTarget.value = event.currentTarget.value.slice(0, 1);
    }
    if (isIncludesNotAlphabet(event.currentTarget.value)) {
      event.currentTarget.value = "";
    }
    if (/^[a-zA-Z]{1}$/.test(event.currentTarget.value)) {
      if ([...state.ball].includes(event.currentTarget.value)) {
        // set style!
      }
      const balls = new Set([...state.ball, event.currentTarget.value]);
      dispatch({
        actionType: ActionTypes.ball,
        ball: balls,
        activeElement: ballInput.current,
      });
      event.currentTarget.value = "";
    }
  };

  return (
    <div className="ball-wrap">
      <div className="ball-tagsinput-wrap">
        <div className="ball-tags" data-testid="ball-tags">
          {state.ball}
        </div>
        <input
          name="ball-tagsinput"
          aria-label="ball-tagsinput"
          onFocus={onFocus}
          onChange={onChange}
          maxLength={1}
          ref={ballInput}
        />
      </div>
    </div>
  );
};
