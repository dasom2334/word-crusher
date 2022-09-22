import fs from "fs";

import path from "path";
import { ORIGIN_DB } from "../utils";
import { GetFileLength } from "./DBUtils";
import { GenerateDB } from "./GenerateDB";
describe("Word DB File Generate", () => {
  it("Make sure every file is not missing a single word", async () => {
    const test_db = "test_db";
    const testDir = `${test_db}s`;
    const filePrefix = `${test_db}_`;
    const originFilePath = path.join(__dirname, ORIGIN_DB);
    await GenerateDB(originFilePath, path.join(__dirname, testDir, filePrefix));
    fs.mkdir(path.join(__dirname, testDir), (err) => null);

    const originFileLength = await GetFileLength(originFilePath);

    let genedFilesLength: {
      [k in string]: number;
    } = {};
    await Promise.all(
      fs
        .readdirSync(path.join(__dirname, testDir))
        .filter((file) => file.match(new RegExp(`^${filePrefix}`, "g")))
        .map(async (file) => {
          const words: string[] = (
            await import(path.join(__dirname, testDir, file))
          ).default;
          genedFilesLength[words[0].length] = words.length;
        })
    );
    const genedFilesTotalLength = Object.values(genedFilesLength).reduce(
      (pre: number, crr: number) => pre + crr
    );
    expect(originFileLength).toEqual(genedFilesTotalLength);
  });
});
