// import readline from readline;
import fs from "fs";
import { GENERATED_DB_EXTENSION, getFileLines } from "../utils";

export async function GenerateDB(filePath: string, filePrefix: string) {
  const fileLines = getFileLines(filePath);

  let newStreamList: {
    [k in string]: fs.WriteStream;
  } = {};

  for await (const word of fileLines) {
    writeWordToStreamListByWordLength(word, newStreamList, filePrefix);
  }
}
function writeWordToStreamListByWordLength(
  word: string,
  newStreamList: { [x: string]: fs.WriteStream },
  filePrefix: string
) {
  const wordLength = word.length.toString();
  if (!(wordLength in newStreamList)) {
    newStreamList[wordLength] = fs.createWriteStream(
      `${filePrefix}${wordLength}${GENERATED_DB_EXTENSION}`
    );
  }
  newStreamList[wordLength].write(word + "\r\n", checkErrorThrow);
}

function checkErrorThrow(err: Error | undefined | null) {
  if (err instanceof Error) {
    console.log(err);
    throw err;
  }
}
