import React, { ChangeEvent, FocusEvent, useRef } from "react";
import { useAppDispatch, useAppState } from "../../context/context";
import {
  isIncludesNotAlphabet,
  isLenthOverThenOne,
  putClassForAwhile,
} from "../../utils";

interface StrikeProps {}

export const Strike: React.FC<StrikeProps> = React.memo(() => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  let strikeRef = useRef<HTMLInputElement[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let isShaking = false;
    if (isIncludesNotAlphabet(event.target.value)) {
      event.target.value = event.target.value.match(/[a-z]/i)?.[0] || "";
      isShaking = true;
    }
    if (!isIncludesNotAlphabet(event.target.value)) {
      event.target.value = event.target.value.toUpperCase();
    }
    const location = getLocation(event);
    if (isLenthOverThenOne(event.target.value)) {
      event.target.value = state.strike[location] || "";
      isShaking = true;
    }
    if (isShaking) putClassForAwhile(event.target, "shaking");
    if (
      ![...state.denyStrike[location]].includes(event.target.value) &&
      ![...state.denyBall].includes(event.target.value)
    ) {
      dispatch({
        type: "STRIKE",
        location,
        character: event.target.value,
      });
      return;
    }
    event.target.value = state.strike[location] || "";
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
});
