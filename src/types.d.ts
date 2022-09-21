type stateProps = {
  count: number;
  strike: string[];
  ball: Set<string>;
  activeElement: HTMLInputElement | null;
  result: Promise<string[]>;
};

type actionProps =
  | { type: "COUNT_UP" }
  | { type: "COUNT_DOWN" }
  | { type: "STRIKE"; location: number; character: string }
  | { type: "BALL_ADD"; character: string }
  | { type: "BALL_REMOVE"; character: string }
  | { type: "ACTIVE_ELEMENT"; activeElement: HTMLInputElement | null }
  | { type: "KEYBOARD_PUSH"; character: string }
  | { type: "SUBMIT" };
