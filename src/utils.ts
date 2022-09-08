
export const COUNT_MAX = 10;
export const COUNT_MIN = 1;
export const GENERATED_DB_PREFIX = "words_length_";
export const GENERATED_DB_EXTENSION = ".txt";
export const ORIGIN_DB = "3of6game.txt";

export const reducerTypes = {
  count_up: "COUNT_UP",
  count_down: "COUNT_DOWN",
  strike: "STRIKE",
  ball: "BALL",
  keyboard: "KEYBOARD",
  //   submit: "SUBMIT",
} as const;
