import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/User.js";

import { BCRYPT_SALT_ROUNDS } from "../utils/variables.js";
import { validation_error } from "../utils/validation_error.js";
import {
  register_validator,
  login_validator,
} from "../validation/authValidator.js";

export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const inputErrors = await validation_error(register_validator, req.body, res);

  if (inputErrors) return inputErrors;

  const emailRegistered = await User.findOne({ email }).exec();

  if (emailRegistered)
    return res.status(400).json({ email: "Email already registered" });

  const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
  const hashedPassword = bcrypt.hashSync(password, salt);

  await User.create({ email, password: hashedPassword });

  return res.status(201).json("User Successfully created");
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const inputErrors = await validation_error(login_validator, req.body, res);

  if (inputErrors) return inputErrors;

  const user = await User.findOne({ email }).exec();

  if (!user) return res.status(404).json({ email: "Email not registered" });

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect)
    return res.status(401).json([
      {
        password: "Password Incorrect",
      },
    ]);

  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 60 * 1000,
  });

  return res.status(200).json({ accessToken });
});

export const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findById(decoded.id);

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        { id: foundUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );

      res.json({ accessToken });
    })
  );
};

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.cookie("jwt", "");
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.json({ message: "logout successfully" });
};
