const express = require("express");
const router = express.Router();

const verifyWithJwt = require("../utils/verifyToken");

const healthControllers = require("../controllers/healthController");

router.get("/all", verifyWithJwt, healthControllers.getAllHealth);
router.post("/add", verifyWithJwt, healthControllers.addHealth);
router.put("/:hid", verifyWithJwt, healthControllers.updateHealth);
router.delete("/:hid", verifyWithJwt, healthControllers.deleteHealth);

module.exports = router;
