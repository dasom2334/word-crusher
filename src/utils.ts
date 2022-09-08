import readline from "readline";
import fs from "fs";

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

export const GetFileLength = async (file_path: string): Promise<number> => {
  const rl = readline.createInterface({
    input: fs.createReadStream(file_path),
    crlfDelay: Infinity,
  });

  let count = 0;
  for await (const _ of rl) {
    count++;
  }
  return count;
};
export const addTwoNumber = (pre: number, crr: number) => pre + crr;
export const removedFromListString = (
  origin_string: string,
  ...targetStrings: string[]
) => {
  let result = origin_string;
  for (const str of targetStrings) {
    result = result.replace(str, "");
  }
  return result;
};