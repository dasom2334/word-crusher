import { COUNT_MAX, COUNT_MIN, ActionTypes } from "../utils";

const reducer = (state: stateProps, action: actionProps): stateProps => {
  switch (action.actionType) {
    case ActionTypes.count_up:
      if (state.count >= COUNT_MAX) return { ...state };
      return { ...state, count: state.count + 1 };
    case ActionTypes.count_down:
      if (state.count <= COUNT_MIN) return { ...state };
      return { ...state, count: state.count - 1 };
    case ActionTypes.strike:
      if (state.strike === undefined) {
        return { ...state };
      }
      return { ...state, strike: action.strike as stateProps["strike"] };
    case ActionTypes.ball:
      if (state.ball === undefined) {
        return { ...state };
      }
      return { ...state, ball: action.ball as stateProps["ball"] };
    default:
      throw new Error(`Unhandled action type ${action.actionType}`);
  }
};

export default reducer;
