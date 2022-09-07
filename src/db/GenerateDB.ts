// import readline from readline;
import readline from "readline";
import fs from "fs";

export async function GenerateDB(file_path: string, file_prefix: string) {
  const fileStream = fs.createReadStream(file_path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let streams: {
    [k in string]: fs.WriteStream;
  } = {};

  for await (const line of rl) {
    const len = line.length.toString();
    if (!streams[len]) {
      streams[len] = fs.createWriteStream(`${file_prefix}${len}.txt`);
    }
    streams[len].write(line + "\r\n", (err) => {});
  }
}
