const express = require("express");
const verifyWithJwt = require("../utils/verifyToken");
const router = express.Router();

const milkControllers = require("../controllers/milkControllers");

router.get("/all", verifyWithJwt, milkControllers.getAllMilkData);
router.get("/:mid", verifyWithJwt, milkControllers.getMilkData);
router.post("/add", verifyWithJwt, milkControllers.addMilkData);
router.put("/:mid", verifyWithJwt, milkControllers.updateMilkData);
router.delete("/:mid", verifyWithJwt, milkControllers.deleteMilkData);

module.exports = router;
