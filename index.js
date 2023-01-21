import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();

dotenv.config();

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

mongoose.set("strictQuery", "false");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, async () =>
      console.log(
        `Connected to database successfully \nServer running on http://localhost:${process.env.PORT}`
      )
    )
  )
  .catch((err) => console.log(err));
