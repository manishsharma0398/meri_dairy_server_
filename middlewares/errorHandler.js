import { ERROR_LOG_FILENAME } from "../utils/variables.js";
import { logEvents } from "./logger.js";

export const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    ERROR_LOG_FILENAME
  );
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({ message: err.message });
};
