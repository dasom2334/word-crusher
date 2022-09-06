import React from "react";
import { useReducerState } from "../../context/context";

interface KeyboardProps {}

export const Keyboard: React.FC<KeyboardProps> = ({}) => {
  const { state, dispatch } = useReducerState();
  const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  const rows = [];
  // for (let i = 0; i < 3; i++) {
  for (const str of keys) {
    rows.push(
      <div className="row" key={"keywrap-" + str}>
        {str.split("").map((e) => (
          <button aria-label={"key-" + e} key={"key-" + e}>
            {e}
          </button>
        ))}
      </div>
    );
  }
  return <div className="keyboard_wrap">{rows}</div>;
};
