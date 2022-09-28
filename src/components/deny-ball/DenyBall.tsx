import React, { ChangeEvent, useRef, FocusEvent } from "react";
import { useAppState, useAppDispatch } from "../../context/context";
import { isLenthOverThenOne, isIncludesNotAlphabet } from "../../utils";

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
    if (isLenthOverThenOne(event.currentTarget.value)) {
      event.currentTarget.value = event.currentTarget.value.slice(0, 1);
    }
    if (isIncludesNotAlphabet(event.currentTarget.value)) {
      event.currentTarget.value = "";
    }
    if (/^[a-zA-Z]{1}$/.test(event.currentTarget.value)) {
      dispatch({
        type: "DENY_BALL_ADD",
        character: event.currentTarget.value,
      });
      event.currentTarget.value = "";
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
            <button data-charcter={e} onClick={() => removeDenyBall(e)} key={e}>
              remove deny ball {e}
            </button>
          ))}
        </div>
        <input
          name="deny-ball-tagsinput"
          aria-label="deny-ball-tagsinput"
          onFocus={onFocus}
          onChange={onChange}
          maxLength={1}
          ref={denyBallInput}
        />
      </div>
    </div>
  );
};
