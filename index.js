import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
import db from "./database/db.js";

import authRoutes from "./routes/authRoutes.js";
// const animalRoutes = require("./routes/animalRoutes");
// const milkRoutes = require("./routes/milkRoutes");
// const healthRoutes = require("./routes/healthRoutes");
// const workerRoutes = require("./routes/workerRoutes");
// const transactionRoutes = require("./routes/transactionRoutes");
// const treatmentRoutes = require("./routes/treatmentRoutes");
// const matingRoutes = require("./routes/matingRoutes");
// const photoUploadRoute = require("./routes/photoUploadRoute");

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

db();
mongoose.connection.once("open", () => {
  console.log(`Connected to database successfully `);
  app.listen(process.env.PORT, async () =>
    console.log(`Server running on http://localhost:${process.env.PORT}`)
  );
});
