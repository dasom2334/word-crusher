import React, { ChangeEvent, FocusEvent, useRef } from "react";
import { useAppDispatch, useAppState } from "../../context/context";
import { isIncludesNotAlphabet, putClassForAwhile } from "../../utils";

interface DenyStrikeProps {}

export const DenyStrike: React.FC<DenyStrikeProps> = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  let inputs = [];
  let denyStrikeRef = useRef<HTMLInputElement[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isIncludesNotAlphabet(event.target.value)) {
      event.target.value = event.target.value.toUpperCase();
    }
    const location = getLocation(event);
    if (state.denyStrike[location].has(event.target.value.charAt(event.target.value.length - 1))) {
      event.target.value = [...state.denyStrike[location]].join("") || "";
      putClassForAwhile(event.target, "shaking");
      return;
    }
    if (isIncludesNotAlphabet(event.target.value)) {
      event.target.value = [...state.denyStrike[location]].join("") || "";
      putClassForAwhile(event.target, "shaking");
      return;
    }
    dispatch({ type: "DENY_STRIKE", location, characters: event.target.value });
  };

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: "ACTIVE_ELEMENT",
      activeElement: denyStrikeRef.current[getLocation(event)],
    });
  };

  const getLocation = (event: FocusEvent | ChangeEvent) =>
    parseInt(event.target.getAttribute("data-deny-strike-location") as string);

  for (let i = 0; i < state.count; i++) {
    inputs.push(
      <input
        type="text"
        onChange={onChange}
        onFocus={onFocus}
        name={"deny-strike-" + i}
        data-deny-strike-location={i}
        aria-label={"deny-strike-" + i}
        key={i}
        ref={(ref: HTMLInputElement) => {
          denyStrikeRef.current[i] = ref;
        }}
      />
    );
  }
  return <div className="deny strike-wrap">{inputs}</div>;
};
