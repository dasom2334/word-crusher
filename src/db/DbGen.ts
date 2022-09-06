import { GENERATED_DB_FILENAME_PREFIX } from "../utils";
import { GenerateDB } from "./makeDbs";

if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}
GenerateDB(process.argv[2], GENERATED_DB_FILENAME_PREFIX);
