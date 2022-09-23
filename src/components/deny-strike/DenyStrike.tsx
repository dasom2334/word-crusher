import React, { ChangeEvent, useRef, FocusEvent } from 'react'
import { useAppState, useAppDispatch } from '../../context/context';
import { isLenthOverThenOne, isIncludesNotAlphabet } from '../../utils';

interface DenyStrikeProps {

}

export const DenyStrike: React.FC<DenyStrikeProps> = ({}) => {
    const state = useAppState();
    const dispatch = useAppDispatch();
    let inputs = [];
    let denyStrikeRef = useRef<HTMLInputElement[]>([]);
  
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
      dispatch({ type: "STRIKE", location, character: event.target.value });
    };
  
    const onFocus = (event: FocusEvent<HTMLInputElement>) => {
      event.target.value = "";
      dispatch({
        type: "ACTIVE_ELEMENT",
        activeElement: denyStrikeRef.current[getLocation(event)],
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
          name={"strike_" + i}
          data-strike-location={i}
          aria-label={"strike_" + i}
          key={i}
          ref={(ref: HTMLInputElement) => {
            denyStrikeRef.current[i] = ref;
          }}
        />
      );
    }
    return (
      <div className="strike_wrap">
        <div>{state.strike}</div>
  
        {inputs}
      </div>
    );
}