export const COUNT_MAX = 22;
export const COUNT_MIN = 1;
export const GENERATED_DB_PREFIX = "words_length_";
// export const GENERATED_DB_EXTENSION = ".txt";
export const GENERATED_DB_EXTENSION = ".ts";
export const ORIGIN_DB = "3of6game.txt";

export function isLenthOverThenOne(value: string) {
  return value.length > 1;
}

export function isIncludesNotAlphabet(value: string) {
  return /[^a-z]+/.test(value);
}
