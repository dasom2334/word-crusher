type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type stateProps = {
  count: number;
  strike: string[];
  ball: Set<string>;
  denyStrike: Set<string>[];
  denyBall: Set<string>;
  activeElement: HTMLInputElement | null;
  result: Promise<string[]>;
};


type countUpActionProps = { type: "COUNT_UP" };
type countDownActionProps = { type: "COUNT_DOWN" };
type strikeActionProps = {
  type: "STRIKE";
  location: number;
  character: string;
};
type ballAddActionProps = { type: "BALL_ADD"; character: string };
type ballRemoveActionProps = {
  type: "BALL_REMOVE";
  character: string;
};
type denyStrikeActionProps = {
  type: "DENY_STRIKE";
  location: number;
  characters: string;
};
type denyBallAddActionProps = {
  type: "DENY_BALL_ADD";
  character: string;
};
type denyBallRemoveActionProps = {
  type: "DENY_BALL_REMOVE";
  character: string;
};
type activeElementActionProps = {
  type: "ACTIVE_ELEMENT";
  activeElement: HTMLInputElement | null;
};
type clearActionProps = { type: "CLEAR" };
type submitActionProps = { type: "SUBMIT" };

type typeActionProps = {
  COUNT_UP: countUpActionProps;
  COUNT_DOWN: countDownActionProps;
  STRIKE: strikeActionProps;
  BALL_ADD: ballAddActionProps;
  BALL_REMOVE: ballRemoveActionProps;
  DENY_STRIKE: denyStrikeActionProps;
  DENY_BALL_ADD: denyBallAddActionProps;
  DENY_BALL_REMOVE: denyBallRemoveActionProps;
  ACTIVE_ELEMENT: activeElementActionProps;
  CLEAR: clearActionProps;
  SUBMIT: submitActionProps;
};

type actionProps = typeActionProps[keyof typeActionProps];
