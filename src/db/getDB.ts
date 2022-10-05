import words1 from "./words_length_1";
import words2 from "./words_length_2";
import words3 from "./words_length_3";
import words4 from "./words_length_4";
import words5 from "./words_length_5";
import words6 from "./words_length_6";
import words7 from "./words_length_7";
import words8 from "./words_length_8";
import words9 from "./words_length_9";
import words10 from "./words_length_10";
import words11 from "./words_length_11";
import words12 from "./words_length_12";
import words13 from "./words_length_13";
import words14 from "./words_length_14";
import words15 from "./words_length_15";
import words16 from "./words_length_16";
import words17 from "./words_length_17";
import words18 from "./words_length_18";
import words19 from "./words_length_19";
import words20 from "./words_length_20";
import words21 from "./words_length_21";
import words22 from "./words_length_22";

const wordDictionary: Record<number, string[]> = {
  1: words1,
  2: words2,
  3: words3,
  4: words4,
  5: words5,
  6: words6,
  7: words7,
  8: words8,
  9: words9,
  10: words10,
  11: words11,
  12: words12,
  13: words13,
  14: words14,
  15: words15,
  16: words16,
  17: words17,
  18: words18,
  19: words19,
  20: words20,
  21: words21,
  22: words22,
};

export async function getWords(state: stateProps): Promise<string[]> {
  return wordDictionary[state.count]
    .filter((word: string) => {
      const match = word.match(makeRegExpByState(state));
      return match !== null && match[0] === word;
    })
    .map((e) => e.toUpperCase());
}

function makeRegExpByState(state: stateProps): RegExp {
  return new RegExp(
    makeRegExpStringByStrike(state) +
      makeRegExpStringByBall(state) +
      makeRegExpStringByDenyStrike(state) +
      makeRegExpStringByDenyBall(state) +
      ".*",
    "gi"
  );
}

function makeRegExpStringByStrike(state: stateProps): string {
  return state.strike
    .map((character, location) =>
      character !== ""
        ? `(?=.{${location}}${character}.{${state.count - location - 1}})`
        : ""
    )
    .join("");
}
function makeRegExpStringByBall(state: stateProps): string {
  return [...state.ball].map((character) => `(?=.*${character})`).join("");
}
function makeRegExpStringByDenyStrike(state: stateProps): string {
  return state.denyStrike
    .map((characters, location) =>
      characters.size !== 0
        ? [...characters]
            .map(
              (character) =>
                `(?!.{${location}}${character}.{${state.count - location - 1}})`
            )
            .join("")
        : ""
    )
    .join("");
}
function makeRegExpStringByDenyBall(state: stateProps): string {
  return [...state.denyBall].map((character) => `(?!.*${character})`).join("");
}
