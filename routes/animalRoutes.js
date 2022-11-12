const express = require("express");
const verifyWithJwt = require("../utils/verifyToken");
const router = express.Router();

const animalControllers = require("../controllers/animalController");

router.get("/all", verifyWithJwt, animalControllers.getAllAnimals);
router.get("/:aid", verifyWithJwt, animalControllers.getAnimalById);
router.post("/add", verifyWithJwt, animalControllers.createNewAnimal);
router.put("/:aid", verifyWithJwt, animalControllers.updateAnimal);
router.delete("/:aid", verifyWithJwt, animalControllers.deleteAnimal);

module.exports = router;
