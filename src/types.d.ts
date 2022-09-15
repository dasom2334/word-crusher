type stateProps = {
  count: number;
  strike: (string | null)[];
  ball: Set<string>;
  activeElement?: HTMLInputElement | null;
  result?: Promise<string[]>;
};

type actionProps = {
  actionType: typeof types[keyof typeof types];
} & Partial<stateProps>;
