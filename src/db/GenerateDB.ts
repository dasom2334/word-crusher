// import readline from readline;
import readline from "readline";
import fs from "fs";
import { GENERATED_DB_EXTENSION } from "../utils";

export async function GenerateDB(filePath: string, filePrefix: string) {
  const originFileStream = fs.createReadStream(filePath);
  const fileLines = readline.createInterface({
    input: originFileStream,
    crlfDelay: Infinity,
  });
  let newStreamList: {
    [k in string]: fs.WriteStream;
  } = {};

  for await (const line of fileLines) {
    const wordLength = line.length.toString();
    prepareStream(newStreamList, wordLength, filePrefix);
    newStreamList[wordLength].write(line + "\r\n", checkErrorThrow);
  }
}

function checkErrorThrow(err: Error | undefined | null) {
  if (err instanceof Error) {
    console.log(err);
    throw err;
  }
}

function prepareStream(
  newStreamList: { [x: string]: fs.WriteStream },
  wordLength: string,
  filePrefix: string
) {
  if (!newStreamList[wordLength]) {
    newStreamList[wordLength] = fs.createWriteStream(
      `${filePrefix}${wordLength}${GENERATED_DB_EXTENSION}`
    );
  }
}
