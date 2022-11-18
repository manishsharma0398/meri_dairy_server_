const express = require("express");
const verifyWithJwt = require("../utils/verifyToken");
const router = express.Router();

const healthControllers = require("../controllers/healthController");

router.get("/all", verifyWithJwt, healthControllers.getAllHealth);
// router.get("/:aid", verifyWithJwt, animalControllers.getAnimalById);
router.post("/add", verifyWithJwt, healthControllers.addHealth);
router.put("/:hid", verifyWithJwt, healthControllers.updateHealth);
router.delete("/:hid", verifyWithJwt, healthControllers.deleteHealth);

module.exports = router;
