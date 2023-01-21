import express from "express";
const router = express.Router();

import {
  login,
  logout,
  refresh,
  register,
} from "../controllers/authController.js";
import loginLimiter from "../middlewares/loginLimiter.js";

router.post("/register", register);
router.get("/refresh", refresh);
router.post("/login", loginLimiter, login);
router.post("/logout", logout);

export default router;
