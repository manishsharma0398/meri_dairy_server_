import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import url from "url";
import fsPromises from "fs/promises";
import path from "path";

import {
  ERROR_LOG_FILENAME,
  REQUEST_LOG_FILENAME,
} from "../utils/variables.js";

export const logEvents = async (message, logFileName = ERROR_LOG_FILENAME) => {
  const __filename = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

export const logger = (req, res, next) => {
  logEvents(
    `${req.method}\t${req.url}\t${req.headers.origin}`,
    REQUEST_LOG_FILENAME
  );
  console.log(`${req.method} ${req.path}`);
  next();
};
