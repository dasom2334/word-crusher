// import readline from readline;
import fs from "fs";
import { GENERATED_DB_EXTENSION } from "../utils";
import { getFileLines } from "./DBUtils";

export async function GenerateDB(filePath: string, filePrefix: string) {
  const fileLines = getFileLines(filePath);

  let newStreamList: {
    [k in string]: fs.WriteStream;
  } = {};

  for await (const word of fileLines) {
    writeWordToStreamListByWordLength(word, newStreamList, filePrefix);
  }
  await wrapUpNewStream(newStreamList);
}
function writeWordToStreamListByWordLength(
  word: string,
  newStreamList: { [x: string]: fs.WriteStream },
  filePrefix: string
) {
  const wordLength = word.length.toString();
  prepareNewStream(wordLength, newStreamList, filePrefix);
  newStreamList[wordLength].write(`"${word}",\r\n`, checkErrorThrow);
}

function prepareNewStream(
  wordLength: string,
  newStreamList: { [x: string]: fs.WriteStream },
  filePrefix: string
) {
  if (wordLength in newStreamList) return;

  newStreamList[wordLength] = fs.createWriteStream(
    `${filePrefix}${wordLength}${GENERATED_DB_EXTENSION}`
  );
  newStreamList[wordLength].write(`const words = [\r\n`, checkErrorThrow);
}

function wrapUpNewStream(newStreamList: { [x: string]: fs.WriteStream }) {
  for (const wordLength in newStreamList) {
    newStreamList[wordLength].write(
      `];\r\nexport default words;`,
      checkErrorThrow
    );
  }
}

function checkErrorThrow(err: Error | undefined | null) {
  if (err instanceof Error) {
    console.log(err);
    throw err;
  }
}
