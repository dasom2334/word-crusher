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

type actionTypes = {
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

type countUpActionProps = { type: actionTypes.COUNT_UP };
type countDownActionProps = { type: actionTypes.COUNT_DOWN };
type strikeActionProps = {
  type: actionTypes.STRIKE;
  location: number;
  character: string;
};
type ballAddActionProps = { type: actionTypes.BALL_ADD; character: string };
type ballRemoveActionProps = {
  type: actionTypes.BALL_REMOVE;
  character: string;
};
type denyStrikeActionProps = {
  type: actionTypes.DENY_STRIKE;
  location: number;
  characters: string;
};
type denyBallAddActionProps = {
  type: actionTypes.DENY_BALL_ADD;
  character: string;
};
type denyBallRemoveActionProps = {
  type: actionTypes.DENY_BALL_REMOVE;
  character: string;
};
type activeElementActionProps = {
  type: actionTypes.ACTIVE_ELEMENT;
  activeElement: HTMLInputElement | null;
};
type clearActionProps = { type: actionTypes.CLEAR };
type submitActionProps = { type: actionTypes.SUBMIT };

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
