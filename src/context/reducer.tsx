import { getWords } from "../db/getDB";
import { COUNT_MAX, COUNT_MIN } from "../utils";
import { initialState, makeInitialState } from "./context";

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

const reducer = (state: stateProps, action: actionProps): stateProps => {
  switch (action.type) {
    case "COUNT_UP":
      if (state.count >= COUNT_MAX) return state;
      return { ...makeInitialState(state.count + 1) };
    case "COUNT_DOWN":
      if (state.count <= COUNT_MIN) return state;
      return { ...makeInitialState(state.count - 1) };
    case "STRIKE":
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
    case "BALL_ADD":
      if (
        state.ball.has(action.character) ||
        state.denyBall.has(action.character)
      )
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
    case "BALL_REMOVE":
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
    case "DENY_STRIKE":
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
    case "DENY_BALL_ADD":
      if (
        state.denyBall.has(action.character) ||
        state.ball.has(action.character)
      )
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
    case "DENY_BALL_REMOVE":
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
    case "ACTIVE_ELEMENT":
      return {
        ...state,
        activeElement: action.activeElement
          ? action.activeElement
          : state.activeElement,
      };
    case "CLEAR":
      return { ...initialState };
    case "SUBMIT":
      return { ...state, result: getWords(state) };
    default:
      return state;
  }
};

export default reducer;
