import { rateLimit } from "express-rate-limit";

import { ERROR_LOG_FILENAME } from "../utils/variables.js";
import { logEvents } from "./logger.js";

const loginEmitter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, //
  message: {
    message:
      "Too many login requests from this IP, please try again after 60 seconds",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      ERROR_LOG_FILENAME
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginEmitter;
