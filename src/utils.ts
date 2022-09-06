export {};

export const COUNT_MAX = 10;
export const COUNT_MIN = 1;
export const GENERATED_DB_FILENAME_PREFIX = "words_length_";

export const reducerTypes = {
  count_up: "COUNT_UP",
  count_down: "COUNT_DOWN",
  strike: "STRIKE",
  ball: "BALL",
  keyboard: "KEYBOARD",
  //   submit: "SUBMIT",
} as const;
