import React, { ChangeEvent, FocusEvent, useRef } from "react";
import { useAppDispatch, useAppState } from "../../context/context";
import {
  isContainSameChar,
  isIncludesNotAlphabet,
  putClassForAwhile,
} from "../../utils";

interface DenyStrikeProps {}

export const DenyStrike: React.FC<DenyStrikeProps> = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();

  let denyStrikeRef = useRef<HTMLInputElement[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isIncludesNotAlphabet(event.target.value)) {
      event.target.value = event.target.value.toUpperCase();
    }
    const location = getLocation(event);
    if (
      isContainSameChar(event.target.value) ||
      isIncludesNotAlphabet(event.target.value)
    ) {
      event.target.value = [...state.denyStrike[location]].join("") || "";
    }

    if (![...event.target.value].includes(state.strike[location])) {
      dispatch({
        type: "DENY_STRIKE",
        location,
        characters: event.target.value,
      });
      return;
    }
    event.target.value = [...state.denyStrike[location]].join("") || "";
    putClassForAwhile(event.target, "shaking");
  };

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: "ACTIVE_ELEMENT",
      activeElement: denyStrikeRef.current[getLocation(event)],
    });
  };

  const getLocation = (event: FocusEvent | ChangeEvent) =>
    parseInt(event.target.getAttribute("data-deny-strike-location") as string);

  return (
    <div className="deny strike-wrap">
      {new Array(state.count).fill(null).map((e, i) => (
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
      ))}
    </div>
  );
};
