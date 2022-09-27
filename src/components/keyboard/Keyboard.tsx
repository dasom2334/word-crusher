import React, { MouseEvent } from "react";
import { useAppState } from "../../context/context";

interface KeyboardProps {}

export const Keyboard: React.FC<KeyboardProps> = () => {
  const state = useAppState();

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (state.activeElement === null) return;
    state.activeElement?.focus();

    Object?.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set?.call(
      state.activeElement,
      event.currentTarget.getAttribute("data-key")
    );
    state.activeElement?.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  const rows = [];
  console.log(state.denyStrike);
  state.denyStrike.filter((e) => {console.log(e)});
  for (const str of keys) {
    rows.push(
      <div className="row" key={"keywrap-" + str}>
        {str.split("").map((character) => (
          <KeyboardButton
            key={"key-" + character}
            strikeCount={state.strike.filter((e) => e === character).length}
            denyStrikeCount={state.denyStrike.filter((e) => e.has(character)).length}
            isBalled={state.ball.has(character)}
            character={character}
            clickFunc={onClick}
          />
        ))}
      </div>
    );
  }
  return <div className="keyboard-wrap">{rows}</div>;
};

interface KeyboardButtonProps {
  strikeCount: number;
  denyStrikeCount: number;
  isBalled: boolean;
  character: string;
  clickFunc: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const KeyboardButton: React.FC<KeyboardButtonProps> = ({
  strikeCount,
  denyStrikeCount,
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
      <KeyDenyStrikeCount denyStrikeCount={denyStrikeCount} />
    </span>
  );
};

interface KeyStrikeCountProps {
  strikeCount: number;
}

const KeyStrikeCount: React.FC<KeyStrikeCountProps> = ({ strikeCount }) => {
  return <span className={(strikeCount > 0 ? "active" : "") + " accept"}>{strikeCount}</span>;
};

interface KeyDenyStrikeCountProps {
  denyStrikeCount: number;
}

const KeyDenyStrikeCount: React.FC<KeyDenyStrikeCountProps> = ({
  denyStrikeCount,
}) => {
  return <span className={(denyStrikeCount > 0 ? "active" : "") + " deny"}>{denyStrikeCount}</span>;
};
