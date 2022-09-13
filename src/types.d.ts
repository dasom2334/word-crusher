type stateProps = {
  count: number;
  strike: (string | null)[];
  ball: Set<string>;
  result?: string[];
};

type actionProps = {
  actionType: typeof types[keyof typeof types];
} & Partial<stateProps>;
