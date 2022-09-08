import { GetFileLength } from "../utils";

export {};

describe("Get Words from DB", () => {
  it("the number of word data equal to the file line length", async () => {
    const words = [];
    const filePath = "";

    expect(0).toEqual(words.length);
    // expect(GetFileLength(filePath)).toEqual(words.length);
  });
  it("The searched word must matched the condition", async () => {
    const test_state: stateProps = {
      count: 5,
      ball: new Set(["y", "q"]),
      strike: ["a", null, null, null, null],
      result: [],
    };
    const result: string[] = [];

    for (const word of result) {
      expect(word.match(regexpFromState(test_state))).toEqual(true);
    }
  });
});

function regexpFromState(state: stateProps): RegExp {
  return new RegExp("", "g");
}
