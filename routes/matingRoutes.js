const express = require("express");
const router = express.Router();

const verifyWithJwt = require("../utils/verifyToken");

const matingControllers = require("../controllers/matingController");

router.get("/all", verifyWithJwt, matingControllers.getAllMating);
router.post("/add", verifyWithJwt, matingControllers.addMating);
router.put("/:mid", verifyWithJwt, matingControllers.updateMating);
router.delete("/:mid", verifyWithJwt, matingControllers.deleteMating);

module.exports = router;
