import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

import { BCRYPT_SALT_ROUNDS } from "../utils/variables.js";
import { validation_error } from "../utils/validation_error.js";
import {
  register_validator,
  login_validator,
} from "../validation/authValidator.js";
import handleServerError from "../utils/serverError.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  const inputErrors = await validation_error(register_validator, req.body, res);

  if (inputErrors) return inputErrors;

  const emailRegistered = await User.findOne({ email });

  if (emailRegistered)
    return res.status(400).json({ email: "Email already registered" });

  console.log("creating new user");

  const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({ email, password: hashedPassword });

  try {
    newUser.save();
    return res.status(201).json("User Successfully created");
  } catch (err) {
    return handleServerError(res);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const inputErrors = await validation_error(login_validator, req.body, res);

  if (inputErrors) return inputErrors;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ email: "Email not registered" });

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect)
    return res.status(400).json([
      {
        password: "Password Incorrect",
      },
    ]);

  return res.status(200).json(user);

  // const token = jwt.sign({ id }, process.env.TOKEN_SECRET);

  // return res
  //   .cookie("auth_token", token, {
  //     httpOnly: true,
  //   })
  //   .status(200)
  //   .json({
  //     data: userDetails,
  //   });
};

export const logout = async (req, res) => {
  res.cookie("auth_token", "");
  res.clearCookie("auth_token");
  return res.status(200).json({ message: "logout successfully" });
};
