import React, { ChangeEvent, FocusEvent } from "react";
import { useReducerState } from "../../context/context";
import { types } from "../../context/reducer";

interface StrikeProps {}

export const Strike: React.FC<StrikeProps> = ({}) => {
  const { state, dispatch } = useReducerState();
  let inputs = [];
  let values = state.strike;

  //   const set = new Set<string>(...[]);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(event.target.getAttribute("data-strike-id") as string);
    values[id] = event.target.value;
    dispatch({ type: types.strike, strike: values });
  };
  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    const id = parseInt(event.target.getAttribute("data-strike-id") as string);
    values[id] = "";
    event.target.value = "";
    dispatch({ type: types.strike, strike: values });
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
      ></input>
    );
  }
  return <div className="strike_wrap">{inputs}</div>;
};
