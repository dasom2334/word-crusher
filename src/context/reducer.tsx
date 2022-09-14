import { getWords } from "../db/getDB";
import { COUNT_MAX, COUNT_MIN, ActionTypes } from "../utils";

function fixRequireCount(state: stateProps, action: actionProps) {
  const mergedState = { ...state, ...action };
  const ballLength = mergedState.ball.size;
  const strikeLength = mergedState.strike.filter(
    (e) => ![null, ""].includes(e)
  ).length;
  const requiredLength = ballLength + strikeLength;
  return requiredLength > mergedState.count
    ? requiredLength
    : mergedState.count;
}

const reducer = (state: stateProps, action: actionProps): stateProps => {
  switch (action.actionType) {
    case ActionTypes.count_up:
      if (state.count >= COUNT_MAX) return { ...state };
      return { ...state, count: state.count + 1 };
    case ActionTypes.count_down:
      if (state.count <= COUNT_MIN) return { ...state };
      // const requiredLength = fixRequireCount(state, action);
      return {
        ...state,
        count: state.count - 1,
      };
    case ActionTypes.strike:
      if (state.strike === undefined) {
        return { ...state };
      }
      return {
        ...state,
        strike: action.strike as stateProps["strike"],
        count: fixRequireCount(state, action),
      };
    case ActionTypes.ball:
      if (state.ball === undefined) {
        return { ...state };
      }
      return {
        ...state,
        ball: action.ball as stateProps["ball"],
        count: fixRequireCount(state, action),
      };
    case ActionTypes.submit:
      return { ...state, result: getWords({ ...state, ...action }) };
    case ActionTypes.keyboard:
      return { ...state };
    default:
      throw new Error(`Unhandled action type ${action.actionType}`);
  }
};

export default reducer;
