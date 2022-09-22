
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

function getWordFromLength(count: number): string[] {
  switch (count) {
    case 1:
      return words1;
    case 2:
      return words2;
    case 3:
      return words3;
    case 4:
      return words4;
    case 5:
      return words5;
    case 6:
      return words6;
    case 7:
      return words7;
    case 8:
      return words8;
    case 9:
      return words9;
    case 10:
      return words10;
    case 11:
      return words11;
    case 12:
      return words12;
    case 13:
      return words13;
    case 14:
      return words14;
    case 15:
      return words15;
    case 16:
      return words16;
    case 17:
      return words17;
    case 18:
      return words18;
    case 19:
      return words19;
    case 20:
      return words20;
    case 21:
      return words21;
    case 22:
      return words22;
    default:
      return words5;
  }
}

export async function getWords(state: stateProps): Promise<string[]> {
  return getWordFromLength(state.count).filter((word: string) =>
    word.match(makeRegExpByState(state))
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
