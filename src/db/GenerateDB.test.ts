import fs from "fs";
import path from "path";
import { GENERATED_DB_EXTENSION, GetFileLength, ORIGIN_DB } from "../utils";
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

    let lengths: {
      [k in string]: number;
    } = {};
    await Promise.all(
      fs
        .readdirSync(test_dir)
        .filter((file) => file.match(new RegExp(`^${file_prefix}`, "g")))
        .map(async (file) => {
          const length = file
            .replace(file_prefix, "")
            .replace(GENERATED_DB_EXTENSION, "");
          lengths[length] = await GetFileLength(path.join(test_dir, file));
        })
    );
    const gened_cnt = Object.values(lengths).reduce(
      (a: number, b: number) => a + b,
      0
    );
    expect(origin_cnt).toBe(gened_cnt);
  });
});
