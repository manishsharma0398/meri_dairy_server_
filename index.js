const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

const animalRoutes = require("./routes/animalRoutes");
const authRoutes = require("./routes/authRoutes");
const milkRoutes = require("./routes/milkRoutes");
const healthRoutes = require("./routes/healthRoutes");
const workerRoutes = require("./routes/workerRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const photoUploadRoute = require("./routes/photoUploadRoute");

app.use(express.json());
app.use(cookieParser());

app.use("/api/file", photoUploadRoute);
app.use("/api/animals", animalRoutes);
app.use("/api/milk", milkRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
