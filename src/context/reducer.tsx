export interface stateProps {
  count: number;
  ball: Set<string>;
  strike: string[];
  results: string[];
}

export const types = {
  count_up: "COUNT_UP",
  count_down: "COUNT_DOWN",
  strike: "STRIKE",
  ball: "BALL",
  submit: "SUBMIT",
} as const;

export const COUNT_MAX = 10;
export const COUNT_MIN = 1;

export interface actionProps {
  type: typeof types[keyof typeof types];
}

const reducer = (state: stateProps, action: actionProps): stateProps => {
  switch (action.type) {
    case "COUNT_UP":
      if (state.count >= COUNT_MAX) return { ...state };
      return { ...state, count: state.count + 1 };
    case "COUNT_DOWN":
      if (state.count <= COUNT_MIN) return { ...state };
      return { ...state, count: state.count - 1 };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};

export default reducer;
