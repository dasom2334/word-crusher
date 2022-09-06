import { COUNT_MAX, COUNT_MIN, reducerTypes } from "../utils";

const reducer = (state: stateProps, action: actionProps): stateProps => {
  switch (action.type) {
    case reducerTypes.count_up:
      if (state.count >= COUNT_MAX) return { ...state };
      return { ...state, count: state.count + 1 };
    case reducerTypes.count_down:
      if (state.count <= COUNT_MIN) return { ...state };
      return { ...state, count: state.count - 1 };
    case reducerTypes.strike:
      if (state.strike === undefined) {
        return { ...state };
      } else {
        return { ...state, strike: action.strike as string[] };
      }
    case reducerTypes.ball:
      if (state.ball === undefined) {
        return { ...state };
      } else {
        return { ...state, ball: action.ball as Set<string> };
      }
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};

export default reducer;
