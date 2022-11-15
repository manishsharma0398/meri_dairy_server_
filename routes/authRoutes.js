const express = require("express");
const router = express.Router();
const verifyWithJwt = require("../utils/verifyToken");

const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", verifyWithJwt, authController.logout);

module.exports = router;
