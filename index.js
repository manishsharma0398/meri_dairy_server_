import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
import connectDB from "./database/db.js";

import authRoutes from "./routes/authRoutes.js";
import { logEvents, logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { corsOptions } from "./config/corsOptions.js";
import { MONGO_ERR_LOG_FILENAME } from "./utils/variables.js";
// const animalRoutes = require("./routes/animalRoutes");
// const milkRoutes = require("./routes/milkRoutes");
// const healthRoutes = require("./routes/healthRoutes");
// const workerRoutes = require("./routes/workerRoutes");
// const transactionRoutes = require("./routes/transactionRoutes");
// const treatmentRoutes = require("./routes/treatmentRoutes");
// const matingRoutes = require("./routes/matingRoutes");
// const photoUploadRoute = require("./routes/photoUploadRoute");
connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
// app.use("/api/animals", animalRoutes);
// app.use("/api/milk", milkRoutes);
// app.use("/api/health", healthRoutes);
// app.use("/api/worker", workerRoutes);
// app.use("/api/transaction", transactionRoutes);
// app.use("/api/treatment", treatmentRoutes);
// app.use("/api/mating", matingRoutes);
// app.use("/api/file", photoUploadRoute);

const PORT = process.env.PORT || 5555;

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log(`Connected to database successfully `);
  app.listen(PORT, async () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});

mongoose.connection.on("error", (err) =>
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    MONGO_ERR_LOG_FILENAME
  )
);
