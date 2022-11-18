const express = require("express");
const router = express.Router();

const verifyWithJwt = require("../utils/verifyToken");

const milkControllers = require("../controllers/milkControllers");

router.post("/add", verifyWithJwt, milkControllers.addMilkData);
router.get("/all", verifyWithJwt, milkControllers.getAllMilkData);
router.get("/:mid", verifyWithJwt, milkControllers.getMilkData);
router.put("/:mid", verifyWithJwt, milkControllers.updateMilkData);
router.delete("/:mid", verifyWithJwt, milkControllers.deleteMilkData);

module.exports = router;
