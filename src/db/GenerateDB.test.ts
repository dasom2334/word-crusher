import readline from "readline";
import fs from "fs";

import path from "path";
import { GENERATED_DB_EXTENSION, ORIGIN_DB } from "../utils";
import { GenerateDB } from "./GenerateDB";
describe("Word DB File Generate", () => {
  it("Make sure every file is not missing a single word", async () => {
    const test_db = "test_db";
    const testDir = `${test_db}s`;
    const filePrefix = `${test_db}_`;
    const originFilePath = path.join(__dirname, ORIGIN_DB);
    await GenerateDB(originFilePath, path.join(testDir, filePrefix));
    fs.mkdir(testDir, (err) => null);

    const originFileLength = await GetFileLength(originFilePath);

    let genedFilesLength: {
      [k in string]: number;
    } = {};

    await Promise.all(
      fs
        .readdirSync(testDir)
        .filter((file) => file.match(new RegExp(`^${filePrefix}`, "g")))
        .map(async (file) => {
          genedFilesLength[
            removedString(file, filePrefix, GENERATED_DB_EXTENSION)
          ] = await GetFileLength(path.join(testDir, file));
        })
    );
    const genedFilesTotalLength = Object.values(genedFilesLength).reduce(
      (pre: number, crr: number) => pre + crr
    );
    expect(originFileLength).toEqual(genedFilesTotalLength);
  });
});

const GetFileLength = async (filePath: string): Promise<number> => {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let count = 0;
  for await (const _ of rl) {
    count++;
  }
  return count;
};
const removedString = (
  originString: string,
  ...targetStrings: string[]
) => {
  let result = originString;
  for (const str of targetStrings) {
    result = result.replace(str, "");
  }
  return result;
};
