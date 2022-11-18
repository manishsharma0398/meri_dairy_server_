const express = require("express");
const verifyWithJwt = require("../utils/verifyToken");
const router = express.Router();

const workerControllers = require("../controllers/workerController");

router.get("/all", verifyWithJwt, workerControllers.getAllWorkers);
// router.get("/:aid", verifyWithJwt, animalControllers.getAnimalById);
router.post("/add", verifyWithJwt, workerControllers.addWorker);
// router.put("/:hid", verifyWithJwt, );
router.delete("/:wid", verifyWithJwt, workerControllers.deleteWorker);

module.exports = router;
