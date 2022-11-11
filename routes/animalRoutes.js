const express = require("express");
const router = express.Router();

const animalControllers = require("../controllers/animalController");

router.get("/all", animalControllers.getAllAnimals);
router.get("/:aid", animalControllers.getAnimalById);
router.post("/", animalControllers.createNewAnimal);
router.put("/:aid", animalControllers.updateAnimal);
router.delete("/:aid", animalControllers.deleteAnimal);

module.exports = router;
