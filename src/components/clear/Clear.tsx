import React from "react";
import { useAppDispatch } from "../../context/context";

interface ClearProps {}

export const Clear: React.FC<ClearProps> = () => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch({ type: "CLEAR" });
    [...document.getElementsByTagName("input")].forEach(element => {
        element.value = '';
    });
  };
  return (
    <div className="clear-wrap">
      <button onClick={onClick}>Clear</button>
    </div>
  );
};
