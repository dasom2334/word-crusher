import { GetFileLength } from "../utils";

export {};

describe("Get Words from DB", () => {
  it("The number of word data and the number of file words must be the same", async () => {
    let files: string[] = [];

    files.forEach((file) => {
      expect(GetFileLength(file)).toBe(GetFileLength(file));
    });
  });
  it("The searched word must matched the condition", async () => {
    const test_state: stateProps = {
      count: 5,
      ball: new Set(["y", "q"]),
      strike: ["a", null, null, null, null],
      results: [],
    };
  });
});
