import readline from "readline";
import fs from "fs";
export async function GetFileLength(filePath: string): Promise<number> {
  const fileLine = getFileLines(filePath);
  let count = 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for await (const _ of fileLine) count++;
  return count;
}

export function getFileLines(filePath: string) {
  return readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });
}
