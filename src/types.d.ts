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

// type actionTypes = Record<
//   typeActionProps[keyof typeActionProps],
//   typeActionProps
// >;

interface actionTypes {
  COUNT_UP: "COUNT_UP";
  COUNT_DOWN: "COUNT_DOWN";
  STRIKE: "STRIKE";
  BALL_ADD: "BALL_ADD";
  BALL_REMOVE: "BALL_REMOVE";
  DENY_STRIKE: "DENY_STRIKE";
  DENY_BALL_ADD: "DENY_BALL_ADD";
  DENY_BALL_REMOVE: "DENY_BALL_REMOVE";
  ACTIVE_ELEMENT: "ACTIVE_ELEMENT";
  CLEAR: "CLEAR";
  SUBMIT: "SUBMIT";
};

interface countUpActionProps { type: "COUNT_UP" };
interface countDownActionProps { type: "COUNT_DOWN" };
interface strikeActionProps {
  type: "STRIKE";
  location: number;
  character: string;
};
interface ballAddActionProps { type: "BALL_ADD"; character: string };
interface ballRemoveActionProps {
  type: "BALL_REMOVE";
  character: string;
};
interface denyStrikeActionProps {
  type: "DENY_STRIKE";
  location: number;
  characters: string;
};
interface denyBallAddActionProps {
  type: "DENY_BALL_ADD";
  character: string;
};
interface denyBallRemoveActionProps {
  type: "DENY_BALL_REMOVE";
  character: string;
};
interface activeElementActionProps {
  type: "ACTIVE_ELEMENT";
  activeElement: HTMLInputElement | null;
};
interface clearActionProps { type: "CLEAR" };
interface submitActionProps { type: "SUBMIT" };

interface typeActionProps {
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
