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
  for await (const word of fileLines) {
    if (word.match(makeRegExpByState(state))) {
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
  const regexpString =
    makeRegExpStringByStrike(state) + makeRegExpStringByBall(state) + ".*";
  return new RegExp(regexpString, "g");
}

function makeRegExpStringByStrike(state: stateProps): string {
  return state.strike
    .map((character, location) =>
      character != null ? `(?=.{${location}}${character})` : null
    )
    .join("");
}
function makeRegExpStringByBall(state: stateProps): string {
  return [...state.ball].map((character) => `(?=.*${character})`).join("");
}
