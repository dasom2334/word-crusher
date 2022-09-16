import React, { ChangeEvent, FocusEvent, useRef } from "react";
import { useReducerState } from "../../context/context";
import {
  ActionTypes,
  isIncludesNotAlphabet,
  isLenthOverThenOne,
} from "../../utils";

interface StrikeProps {}
export const Strike: React.FC<StrikeProps> = ({}) => {
  const { state, dispatch } = useReducerState();
  let inputs = [];
  let values = state.strike;
  let strikeRef = useRef<(HTMLInputElement | null)[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(event.target.getAttribute("data-strike-id") as string);
    if (isLenthOverThenOne(event.target.value)) {
      event.target.value = values[id] || "";
      return;
    }
    if (isIncludesNotAlphabet(event.target.value)) {
      event.target.value = values[id] || "";
      return;
    }
    values[id] = event.target.value;
    dispatch({ actionType: ActionTypes.strike, strike: values });
  };

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    const id = parseInt(event.target.getAttribute("data-strike-id") as string);
    values[id] = "";
    event.target.value = "";
    dispatch({
      actionType: ActionTypes.strike,
      strike: values,
      activeElement: strikeRef.current[id],
    });
  };

  for (let i = 0; i < state.count; i++) {
    inputs.push(
      <input
        type="text"
        onChange={onChange}
        onFocus={onFocus}
        maxLength={1}
        name={"strike_" + i}
        data-strike-id={i}
        aria-label={"strike_" + i}
        key={i}
        ref={(ref) => {
          strikeRef.current[i] = ref;
        }}
      ></input>
    );
  }
  return (
    <div className="strike_wrap">
      <div>{values}</div>

      {inputs}
    </div>
  );
};
