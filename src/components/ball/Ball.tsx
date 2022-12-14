import React, { ChangeEvent, FocusEvent, useRef } from "react";
import { useAppDispatch, useAppState } from "../../context/context";
import {
  isIncludesNotAlphabet,
  isLenthOverThenOne,
  putClassForAwhile,
} from "../../utils";

interface BallProps {}

export const Ball: React.FC<BallProps> = React.memo(() => {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const ballInput = useRef<HTMLInputElement>(null);

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: "ACTIVE_ELEMENT",
      activeElement: ballInput.current,
    });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let isShaking = false;
    if (isIncludesNotAlphabet(event.target.value)) {
      event.target.value = "";
      isShaking = true;
    }
    if (!isIncludesNotAlphabet(event.target.value)) {
      event.target.value = event.target.value.toUpperCase();
    }
    if (isLenthOverThenOne(event.target.value)) {
      event.target.value = event.target.value.slice(1);
      isShaking = true;
    }
    if (isShaking) {
      putClassForAwhile(event.target, "shaking");
    }
    if (
      event.target.value !== "" &&
      ![...state.ball].includes(event.target.value) &&
      ![...state.denyBall].includes(event.target.value)
    ) {
      dispatch({
        type: "BALL_ADD",
        character: event.target.value,
      });
      event.target.value = "";
      return;
    }
  };

  const removeBall = (character: string) => {
    dispatch({
      type: "BALL_REMOVE",
      character,
    });
  };
  return (
    <div className="ball-wrap">
      <div className="ball-tagsinput-wrap">
        <div className="ball-tags" data-testid="ball-tags">
          {[...state.ball].map((e) => (
            <button data-character={e} onClick={() => removeBall(e)} key={e}>
              remove ball {e}
            </button>
          ))}
        </div>
        <input
          name="ball-tagsinput"
          aria-label="ball-tagsinput"
          onFocus={onFocus}
          onChange={onChange}
          ref={ballInput}
        />
      </div>
    </div>
  );
});
