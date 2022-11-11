const express = require("express");
const router = express.Router();

const animalControllers = require("../controllers/animalController");

router.get("/", animalControllers.getAllAnimals);

module.exports = router;
