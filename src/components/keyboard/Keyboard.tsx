import React, { useState } from "react";
import { useReducerState } from "../../context/context";

interface KeyboardProps {}

export const Keyboard: React.FC<KeyboardProps> = ({}) => {
  const { state, dispatch } = useReducerState();

  const onClick = () => {
    console.log('hello')
    console.log(state.activeElement)
    state.activeElement?.focus();
  };

  const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  const rows = [];
  for (const str of keys) {
    rows.push(
      <div className="row" key={"keywrap-" + str}>
        {str.split("").map((character) => (
          <KeyboardButton
            key={"key-" + character}
            strikeCount={state.strike.filter((e) => e === character).length}
            isBalled={state.ball.has(character)}
            character={character}
            clickFunc={onClick}
          />
        ))}
      </div>
    );
  }
  return <div className="keyboard_wrap">{rows}</div>;
};

interface KeyboardButtonProps {
  strikeCount: number;
  isBalled: boolean;
  character: string;
  clickFunc: () => void;
}

export const KeyboardButton: React.FC<KeyboardButtonProps> = ({
  strikeCount,
  isBalled,
  character,
  clickFunc,
}) => {
  return (
    <span>
      <button className={isBalled ? "isBalled" : ""} onClick={clickFunc}>
        {character}
      </button>
      <KeyStrikeCount strikeCount={strikeCount} character={character} />
    </span>
  );
};

interface KeyStrikeCountProps {
  strikeCount: number;
  character: string;
}

const KeyStrikeCount: React.FC<KeyStrikeCountProps> = ({
  strikeCount,
  character,
}) => {
  return <span className={strikeCount > 0 ? "active" : ""}>{strikeCount}</span>;
};
