const express = require("express");
const router = express.Router();

const verifyWithJwt = require("../utils/verifyToken");

const treatmentControllers = require("../controllers/treatmentController");

router.post("/add", verifyWithJwt, treatmentControllers.addTreatment);
router.get("/all", verifyWithJwt, treatmentControllers.getAllTreatment);
router.put("/:tid", verifyWithJwt, treatmentControllers.updateTeatment);
router.delete("/:tid", verifyWithJwt, treatmentControllers.deleteTreatment);

module.exports = router;
