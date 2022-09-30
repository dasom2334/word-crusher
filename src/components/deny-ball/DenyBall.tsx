import React, { ChangeEvent, useRef, FocusEvent } from "react";
import { useAppState, useAppDispatch } from "../../context/context";
import {
  isLenthOverThenOne,
  isIncludesNotAlphabet,
  putClassForAwhile,
} from "../../utils";

interface DenyBallProps {}

export const DenyBall: React.FC<DenyBallProps> = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const denyBallInput = useRef<HTMLInputElement>(null);

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: "ACTIVE_ELEMENT",
      activeElement: denyBallInput.current,
    });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isIncludesNotAlphabet(event.target.value)) {
      event.target.value = "";
      putClassForAwhile(event.target, "shaking");
      return;
    }
    if (!isIncludesNotAlphabet(event.target.value)) {
      event.target.value = event.target.value.toUpperCase();
    }
    if (isLenthOverThenOne(event.target.value)) {
      event.target.value = event.target.value.slice(1);
      putClassForAwhile(event.target, "shaking");
    }
    if ([...state.ball].includes(event.target.value)) {
      putClassForAwhile(event.target, "shaking");
    }
    if (![...state.denyBall].includes(event.target.value)) {
      dispatch({
        type: "DENY_BALL_ADD",
        character: event.target.value,
      });
      event.target.value = "";
    }
  };

  const removeDenyBall = (character: string) => {
    dispatch({
      type: "DENY_BALL_REMOVE",
      character,
    });
  };
  return (
    <div className="deny ball-wrap">
      <div className="deny ball-tagsinput-wrap">
        <div className="deny ball-tags" data-testid="deny-ball-tags">
          {[...state.denyBall].map((e) => (
            <button
              data-character={e}
              onClick={() => removeDenyBall(e)}
              key={e}
            >
              remove deny ball {e}
            </button>
          ))}
        </div>
        <input
          name="deny-ball-tagsinput"
          aria-label="deny-ball-tagsinput"
          onFocus={onFocus}
          onChange={onChange}
          ref={denyBallInput}
        />
      </div>
    </div>
  );
};
