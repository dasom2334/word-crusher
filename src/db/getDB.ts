import path from "path";
import {
  COUNT_MAX,
  COUNT_MIN,
  GENERATED_DB_EXTENSION,
  GENERATED_DB_PREFIX,
} from "../utils";

export async function getWords(state: stateProps): Promise<string[]> {
  return (await importWords(state)).filter((word: string) =>
    word.match(makeRegExpByState(state))
  );
}

async function importWords(state: stateProps): Promise<string[]> {
  return (await import(getFilePath(state.count))).default;
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
  return new RegExp(
    makeRegExpStringByStrike(state) + makeRegExpStringByBall(state) + ".*",
    "g"
  );
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
