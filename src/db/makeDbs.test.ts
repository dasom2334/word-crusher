import { GenerateDB } from "./makeDbs";
// import readline from readline;
import readline from "readline";
import fs from "fs";
import path from "path";
export {};

describe("Word DB File Generate", () => {
  it("Make sure every file is not missing a single word", async () => {
    const test_db = "test_db";
    const test_dir = path.join(__dirname, `${test_db}s`);
    const file_prefix = path.join(test_dir, `${test_db}_`);
    const file_path = path.join(__dirname, "3of6game.txt");
    await GenerateDB(file_path, file_prefix);

    fs.mkdir(test_dir, (err) => null);
    let lengths: {
      [k in string]: number;
    } = {};

    const fileStream = fs.createReadStream(file_path);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    let origin_cnt = 0;
    for await (const _ of rl) origin_cnt++;

    const countings = fs.readdirSync(test_dir).map(async (file) => {
        if (file.match(new RegExp(`^${test_db}_`, "g"))) {
          const gened_filestream = fs.createReadStream(
            path.join(test_dir, file)
          );
          const length = file.replace(`${test_db}_`, "").replace(".txt", "");
          const gened_rl = readline.createInterface({
            input: gened_filestream,
            crlfDelay: Infinity,
          });
          lengths[length] = 0;
          for await (const l of gened_rl) {
            lengths[length]++;
          }
        }
      })
    await Promise.all(countings);
    const gened_cnt = Object.values(lengths).reduce(
      (a: number, b: number) => a + b,
      0
    );
    expect(origin_cnt).toBe(gened_cnt);
  });
});
