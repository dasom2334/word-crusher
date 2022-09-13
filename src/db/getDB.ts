import path from "path";
import {
  COUNT_MAX,
  COUNT_MIN,
  GENERATED_DB_EXTENSION,
  GENERATED_DB_PREFIX,
  getFileLines,
} from "../utils";

export async function getWords(state: stateProps): Promise<string[]> {
  let result: string[] = [];
  const fileLines = getFileLines(getFilePath(state.count));
  const regexp = makeRegExpByState(state);
  for await (const word of fileLines) {
    if (word.match(regexp)) {
      result.push(word);
    }
  }
  return result;
}

function getFilePath(wordLength: number) {
  if (wordLength > COUNT_MAX || wordLength < COUNT_MIN) {
    throw new Error("Word length out of range.");
  }

  return path.join(
    __dirname,
    `${GENERATED_DB_PREFIX}${wordLength}${GENERATED_DB_EXTENSION}`
  );
}

function makeRegExpByState(state: stateProps): RegExp {
  let regexp = "";
  state.strike
    .filter((e) => e !== null)
    .forEach((character, location) => {
      regexp += `(?=.{${location}}${character})`;
    });
  [...state.ball].forEach((character) => {
    regexp += `(?=.*${character})`;
  });
  return new RegExp(regexp + ".*", "g");
}
