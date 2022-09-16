import React, { MouseEvent, ChangeEvent } from "react";
import { useReducerState } from "../../context/context";

interface KeyboardProps {}

export const Keyboard: React.FC<KeyboardProps> = ({}) => {
  const { state, dispatch } = useReducerState();

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    state.activeElement?.focus();
    var setValue = Object?.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;
    setValue?.call(state.activeElement, event.currentTarget.getAttribute("data-key"));
    state.activeElement?.dispatchEvent(new Event("change", { bubbles: true }));
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
  clickFunc: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const KeyboardButton: React.FC<KeyboardButtonProps> = ({
  strikeCount,
  isBalled,
  character,
  clickFunc,
}) => {
  return (
    <span>
      <button
        className={isBalled ? "isBalled" : ""}
        onClick={clickFunc}
        data-key={character}
      >
        {character}
      </button>
      <KeyStrikeCount strikeCount={strikeCount} />
    </span>
  );
};

interface KeyStrikeCountProps {
  strikeCount: number;
}

const KeyStrikeCount: React.FC<KeyStrikeCountProps> = ({ strikeCount }) => {
  return <span className={strikeCount > 0 ? "active" : ""}>{strikeCount}</span>;
};
