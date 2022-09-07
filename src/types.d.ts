type actionProps = {
  type: typeof types[keyof typeof types];
  strike?: string[];
  ball?: Set<string>;
  result?: string[];
};

type stateProps = {
  count: number;
  strike: (string | null)[];
  ball: Set<string>;
  results: string[];
};
