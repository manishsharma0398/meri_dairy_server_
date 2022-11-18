const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const animalRoutes = require("./routes/animalRoutes");
const authRoutes = require("./routes/authRoutes");
const milkRoutes = require("./routes/milkRoutes");
const healthRoutes = require("./routes/healthRoutes");
const workerRoutes = require("./routes/workerRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const treatmentRoutes = require("./routes/treatmentRoutes");
const matingRoutes = require("./routes/matingRoutes");
const photoUploadRoute = require("./routes/photoUploadRoute");

app.use(express.json());
app.use(cookieParser());

app.use("/api/animals", animalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/milk", milkRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/treatment", treatmentRoutes);
app.use("/api/mating", matingRoutes);
app.use("/api/file", photoUploadRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
