export interface stateProps {
  count: number;
  ball:Set<string>;
  strike:string[];
  results: string[];
}

export const types = {
  count: "COUNT",
  strike: "STRIKE",
  ball: "BALL",
  submit: "SUBMIT",
} as const;

export interface actionProps {
  type: typeof types[keyof typeof types];
}

const reducer = (state: stateProps, action: actionProps): stateProps => {
  switch (action.type) {
    case "COUNT":
      return { ...state };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};

export default reducer;
