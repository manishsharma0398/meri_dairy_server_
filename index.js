const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

const animalRoutes = require("./routes/animalRoutes");
const authRoutes = require("./routes/authRoutes");
const milkRoutes = require("./routes/milkRoutes");
const healthRoutes = require("./routes/healthRoutes");
const photoUploadRoute = require("./routes/photoUploadRoute");

app.use(express.json());
app.use(cookieParser());

app.use("/api/file", photoUploadRoute);
app.use("/api/animals", animalRoutes);
app.use("/api/milk", milkRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
