export interface stateProps {
  count: number;
  strike: string[];
  ball: Set<string>;
  results: string[];
}

export const types = {
  count_up: "COUNT_UP",
  count_down: "COUNT_DOWN",
  strike: "STRIKE",
  ball: "BALL",
  keyboard: "KEYBOARD",
  //   submit: "SUBMIT",
} as const;

export const COUNT_MAX = 10;
export const COUNT_MIN = 1;

export interface actionProps {
  type: typeof types[keyof typeof types];
  strike?: string[];
  ball?: Set<string>;
  result?: string[];
}

const reducer = (state: stateProps, action: actionProps): stateProps => {
  switch (action.type) {
    case types.count_up:
      if (state.count >= COUNT_MAX) return { ...state };
      return { ...state, count: state.count + 1 };
    case types.count_down:
      if (state.count <= COUNT_MIN) return { ...state };
      return { ...state, count: state.count - 1 };
    case types.strike:
      if (state.strike === undefined) {
        return { ...state };
      } else {
        return { ...state, strike: action.strike as string[] };
      }
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};

export default reducer;
