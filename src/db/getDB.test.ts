import { initialState } from "../context/context";
import { getWords } from "./getDB";

export {};

describe("Get Words from DB", () => {
  it("The searched word must matched the condition", async () => {
    let test_state = initialState;
    const word = "krone";
    let result: string[] = await getWords(test_state);

    expect(result.includes(word)).toEqual(true);
    test_state.ball = new Set(...word);
    result = await getWords(test_state);
    expect(result.includes(word)).toEqual(true);
    test_state.ball.clear();
    test_state.strike = word.split("");
    result = await getWords(test_state);
    expect(result[0]).toEqual(word);
    test_state.strike[0] = "z";
    result = await getWords(test_state);
    expect(result.includes(word)).toEqual(false);
  });
});
