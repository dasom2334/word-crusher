import React, { ChangeEvent } from "react";
import { useReducerState } from "../../context/context";
import { reducerTypes } from "../../utils";

interface BallProps {}

export const Ball: React.FC<BallProps> = ({}) => {
  const { state, dispatch } = useReducerState();
  const allows = ''
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event);
    const balls = new Set(event.target.value.split(""));
    event.target.value = [...balls].join("");

    dispatch({ type: reducerTypes.ball, ball: balls });
  };
  return (
    <div className="ball_wrap">
      <textarea
        name={"ball"}
        aria-label={"ball"}
        onChange={onChange}
      ></textarea>
    </div>
  );
};
