import React, { ChangeEvent, FocusEvent, useRef } from "react";
import { useAppDispatch, useAppState } from "../../context/context";
import { isIncludesNotAlphabet, isLenthOverThenOne } from "../../utils";

interface StrikeProps {}
export const Strike: React.FC<StrikeProps> = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  let inputs = [];
  let strikeRef = useRef<HTMLInputElement[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const location = getLocation(event);
    if (isLenthOverThenOne(event.target.value)) {
      event.target.value = state.strike[location] || "";
      return;
    }
    if (isIncludesNotAlphabet(event.target.value)) {
      event.target.value = "";
      return;
    }
    event.target.value = event.target.value.toUpperCase();
    dispatch({
      type: "STRIKE",
      location,
      character: event.target.value.toUpperCase(),
    });
  };

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.target.value = "";
    dispatch({
      type: "ACTIVE_ELEMENT",
      activeElement: strikeRef.current[getLocation(event)],
    });
    dispatch({
      type: "STRIKE",
      character: "",
      location: getLocation(event),
    });
  };

  const getLocation = (event: FocusEvent | ChangeEvent) =>
    parseInt(event.target.getAttribute("data-strike-location") as string);

  for (let i = 0; i < state.count; i++) {
    inputs.push(
      <input
        type="text"
        onChange={onChange}
        onFocus={onFocus}
        maxLength={1}
        name={"strike-" + i}
        data-strike-location={i}
        aria-label={"strike-" + i}
        key={i}
        ref={(ref: HTMLInputElement) => {
          strikeRef.current[i] = ref;
        }}
      />
    );
  }
  return <div className="strike-wrap">{inputs}</div>;
};
