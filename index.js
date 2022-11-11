const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const animalRoutes = require("./routes/animalRoutes");

app.use(express.json());

app.use("/api/animals", animalRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
