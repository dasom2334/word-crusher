import React, { ChangeEvent, FocusEvent, useRef } from "react";
import { useAppDispatch, useAppState } from "../../context/context";
import { isIncludesNotAlphabet, isLenthOverThenOne } from "../../utils";

interface BallProps {}

export const Ball: React.FC<BallProps> = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const ballInput = useRef<HTMLInputElement>(new HTMLInputElement());

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: "ACTIVE_ELEMENT",
      activeElement: ballInput.current,
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
        type: "BALL_ADD",
        character: event.currentTarget.value,
      });
      event.currentTarget.value = "";
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
            <span key={e}>
              {e}
              <button onClick={() => removeBall(e)}>remove {e}</button>
            </span>
          ))}
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
