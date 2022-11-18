const express = require("express");
const verifyWithJwt = require("../utils/verifyToken");
const router = express.Router();

const treatmentControllers = require("../controllers/treatmentController");

router.get("/all", verifyWithJwt, treatmentControllers.getAllTreatment);
router.post("/add", verifyWithJwt, treatmentControllers.addTreatment);
router.put("/:tid", verifyWithJwt, treatmentControllers.updateTeatment);
router.delete("/:tid", verifyWithJwt, treatmentControllers.deleteTreatment);

module.exports = router;
