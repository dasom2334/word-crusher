import React, { ChangeEvent, useRef, FocusEvent } from "react";
import { useAppState, useAppDispatch } from "../../context/context";
import { isLenthOverThenOne, isIncludesNotAlphabet } from "../../utils";

interface DenyBallProps {}

export const DenyBall: React.FC<DenyBallProps> = ({}) => {
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
    <div className="ball-wrap">
      <div className="ball-tagsinput-wrap">
        <div className="ball-tags" data-testid="ball-tags">
          {[...state.ball].map((e) => (
            <button onClick={() => removeDenyBall(e)} key={e}>
              remove {e}
            </button>
          ))}
        </div>
        <input
          name="ball-tagsinput"
          aria-label="ball-tagsinput"
          onFocus={onFocus}
          onChange={onChange}
          maxLength={1}
          ref={denyBallInput}
        />
      </div>
    </div>
  );
};
