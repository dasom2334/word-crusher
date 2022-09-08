import readline from "readline";
import fs from "fs";

import path from "path";
import { GENERATED_DB_EXTENSION, ORIGIN_DB } from "../utils";
import { GenerateDB } from "./GenerateDB";
describe("Word DB File Generate", () => {
  it("Make sure every file is not missing a single word", async () => {
    const test_db = "test_db";
    const test_dir = `${test_db}s`;
    const file_prefix = `${test_db}_`;
    const origin_file_path = path.join(__dirname, ORIGIN_DB);
    await GenerateDB(origin_file_path, path.join(test_dir, file_prefix));
    fs.mkdir(test_dir, (err) => null);

    const origin_cnt = await GetFileLength(origin_file_path);

    let gened_files_length: {
      [k in string]: number;
    } = {};

    await Promise.all(
      fs
        .readdirSync(test_dir)
        .filter((file) => file.match(new RegExp(`^${file_prefix}`, "g")))
        .map(async (file) => {
          gened_files_length[
            removedFromListString(file, file_prefix, GENERATED_DB_EXTENSION)
          ] = await GetFileLength(path.join(test_dir, file));
        })
    );
    const gened_files_total_length = Object.values(gened_files_length).reduce(
      (pre: number, crr: number) => pre + crr
    );
    expect(origin_cnt).toEqual(gened_files_total_length);
  });
});

const GetFileLength = async (file_path: string): Promise<number> => {
  const rl = readline.createInterface({
    input: fs.createReadStream(file_path),
    crlfDelay: Infinity,
  });

  let count = 0;
  for await (const _ of rl) {
    count++;
  }
  return count;
};
const removedFromListString = (
  origin_string: string,
  ...targetStrings: string[]
) => {
  let result = origin_string;
  for (const str of targetStrings) {
    result = result.replace(str, "");
  }
  return result;
};
