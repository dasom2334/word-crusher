import React, { ChangeEvent, FocusEvent, useRef } from "react";
import { useAppDispatch, useAppState } from "../../context/context";
import {
  isIncludesNotAlphabet,
  isLenthOverThenOne,
  putClassForAwhile,
} from "../../utils";

interface StrikeProps {}
export const Strike: React.FC<StrikeProps> = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  let strikeRef = useRef<HTMLInputElement[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isIncludesNotAlphabet(event.target.value)) {
      event.target.value = "";
      putClassForAwhile(event.target, "shaking");
      return;
    }
    if (!isIncludesNotAlphabet(event.target.value)) {
      event.target.value = event.target.value.toUpperCase();
    }
    const location = getLocation(event);
    if (isLenthOverThenOne(event.target.value)) {
      event.target.value = state.strike[location] || "";
      putClassForAwhile(event.target, "shaking");
    }
    
    if ([...state.denyStrike[location]].includes(event.target.value)) {
      event.target.value = state.strike[location] || "";
      putClassForAwhile(event.target, "shaking");
      return;
    }
    dispatch({
      type: "STRIKE",
      location,
      character: event.target.value,
    });
  };

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: "ACTIVE_ELEMENT",
      activeElement: strikeRef.current[getLocation(event)],
    });
  };

  const getLocation = (event: FocusEvent | ChangeEvent) =>
    parseInt(event.target.getAttribute("data-strike-location") as string);

  return (
    <div className="strike-wrap">
      {new Array(state.count).fill(null).map((e, i) => (
        <input
          type="text"
          onChange={onChange}
          onFocus={onFocus}
          name={"strike-" + i}
          data-strike-location={i}
          aria-label={"strike-" + i}
          key={i}
          ref={(ref: HTMLInputElement) => {
            strikeRef.current[i] = ref;
          }}
        />
      ))}
    </div>
  );
};
