import { getWords } from "../db/getDB";
import { COUNT_MAX, COUNT_MIN } from "../utils";
import { makeInitialState } from "./context";

function fixRequireCount({
  count,
  strike,
  ball,
}: Readonly<{
  count: number;
  strike: string[];
  ball: Set<string>;
}>) {
  const requiredLength = ball.size + strike.filter((e) => e !== "").length;
  return requiredLength > count ? requiredLength : count;
}

type reduceFunctionProps = {
  state: stateProps;
  action: {
    type: string;
    character?: string;
    characters?: string;
    location?: number;
    activeElement?: HTMLInputElement | null;
  };
};

function countUp({ state }: reduceFunctionProps): stateProps {
  if (state.count >= COUNT_MAX) return state;
  return { ...makeInitialState(state.count + 1) };
}

function countDown({ state }: reduceFunctionProps): stateProps {
  if (state.count <= COUNT_MIN) return state;
  return { ...makeInitialState(state.count - 1) };
}

function strike({ state, action }: reduceFunctionProps): stateProps {
  if (action?.location === undefined || action.character === undefined)
    return state;
  const newStrike = [...state.strike];
  newStrike[action.location] = action.character;
  return {
    ...state,
    strike: newStrike,
    count: fixRequireCount({
      count: state.count,
      ball: state.ball,
      strike: newStrike,
    }),
  };
}

function ballAdd({ state, action }: reduceFunctionProps): stateProps {
  if (action?.character === undefined) return state;
  if (state.ball.has(action.character) || state.denyBall.has(action.character))
    return state;
  const addedBall = new Set([...state.ball]);
  addedBall.add(action.character.toUpperCase());
  return {
    ...state,
    ball: addedBall,
    count: fixRequireCount({
      count: state.count,
      ball: addedBall,
      strike: state.strike,
    }),
  };
}

function ballRemove({ state, action }: reduceFunctionProps): stateProps {
  if (action?.character === undefined) return state;
  if (!state.ball.has(action.character)) return state;
  const removedBall = new Set([...state.ball]);
  removedBall.delete(action.character);
  return {
    ...state,
    ball: removedBall,
    count: fixRequireCount({
      count: state.count,
      ball: removedBall,
      strike: state.strike,
    }),
  };
}

function denyStrike({ state, action }: reduceFunctionProps): stateProps {
  if (action?.location === undefined || action?.characters === undefined)
    return state;
  const newDenyStrike = [...state.denyStrike];
  newDenyStrike[action.location] = new Set([...action.characters]);
  return {
    ...state,
    denyStrike: newDenyStrike,
    count: fixRequireCount({
      count: state.count,
      ball: state.ball,
      strike: state.strike,
    }),
  };
}
function denyBallAdd({ state, action }: reduceFunctionProps): stateProps {
  if (action?.character === undefined) return state;
  if (state.denyBall.has(action.character) || state.ball.has(action.character))
    return state;
  const addedDenyBall = new Set([...state.denyBall]);
  addedDenyBall.add(action.character);
  return {
    ...state,
    denyBall: addedDenyBall,
    count: fixRequireCount({
      count: state.count,
      ball: state.ball,
      strike: state.strike,
    }),
  };
}
function denyBallRemove({ state, action }: reduceFunctionProps): stateProps {
  if (action?.character === undefined) return state;
  if (!state.denyBall.has(action.character)) return state;
  const removedDenyBall = new Set([...state.denyBall]);
  removedDenyBall.delete(action.character);
  return {
    ...state,
    denyBall: removedDenyBall,
    count: fixRequireCount({
      count: state.count,
      ball: state.ball,
      strike: state.strike,
    }),
  };
}
function activeElement({ state, action }: reduceFunctionProps): stateProps {
  if (action?.activeElement === undefined) return state;
  return {
    ...state,
    activeElement: action.activeElement
      ? action.activeElement
      : state.activeElement,
  };
}
function clear({ state }: reduceFunctionProps): stateProps {
  return { ...makeInitialState(state.count) };
}

function submit({ state }: reduceFunctionProps): stateProps {
  return { ...state, result: getWords(state) };
}

const reduceFunctions: Record<
  keyof actionTypes,
  (arg0: reduceFunctionProps) => stateProps
> = {
  COUNT_UP: countUp,
  COUNT_DOWN: countDown,
  STRIKE: strike,
  BALL_ADD: ballAdd,
  BALL_REMOVE: ballRemove,
  DENY_STRIKE: denyStrike,
  DENY_BALL_ADD: denyBallAdd,
  DENY_BALL_REMOVE: denyBallRemove,
  ACTIVE_ELEMENT: activeElement,
  CLEAR: clear,
  SUBMIT: submit,
};
function reducer(state: stateProps, action: actionProps): stateProps {
  return reduceFunctions[action.type as actionTypes[keyof actionTypes]]({
    state,
    action,
  });
}

export default reducer;
