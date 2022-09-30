import React from "react";
import { useAppDispatch } from "../../context/context";
import { allInputClear } from "../../utils";

interface ClearProps {}

export const Clear: React.FC<ClearProps> = () => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch({ type: "CLEAR" });
    allInputClear();
  };
  return (
    <div className="clear-wrap">
      <button onClick={onClick}>Clear</button>
    </div>
  );
};
