import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

import { BCRYPT_SALT_ROUNDS } from "../utils/variables.js";

import {
  register_validator,
  login_validator,
} from "../validation/authValidator.js";

// import db from "../database/db.js";

import handleServerError from "../utils/serverError.js";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    await register_validator.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (errors) {
    const authErr = [];
    errors.details.forEach((err) => {
      const key = err.path[0];
      const obj = {};
      obj[key] = err.message;
      authErr.push(obj);
    });
    return res.status(409).json(authErr);
  }

  const emailRegistered = await User.find({ email });

  if (emailRegistered.length)
    return res.status(400).json({ email: "Email already registered" });

  console.log("creating new user");

  const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({ email, password: hashedPassword });

  try {
    newUser.save();
    return res.status(201).json("User Successfully created");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later" });
  }
};

export const login = async (req, res) => {
  try {
    await login_validator.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (errors) {
    const authErr = [];
    errors.details.forEach((err) => {
      const key = err.path[0];
      const obj = {};
      obj[key] = err.message;
      authErr.push(obj);
    });
    return res.status(409).json(authErr);
  }

  const user = await User.findOne({ email });

  console.log(user);

  // const q = "SELECT * FROM user WHERE `email`=?";
  // db.query(q, [req.body.email], (err, data) => {
  //   if (err) return handleServerError(res);

  //   if (data.length === 0)
  //     return res.status(404).json([
  //       {
  //         email_error: "No user registered with this email",
  //       },
  //     ]);

  //   const isPasswordCorrect = bcrypt.compareSync(
  //     req.body.password,
  //     data[0].password
  //   );

  //   if (!isPasswordCorrect)
  //     return res.status(400).json([
  //       {
  //         password_error: "Password Incorrect",
  //       },
  //     ]);

  //   const { id, password, ...userDetails } = data[0];

  //   const token = jwt.sign({ id }, process.env.TOKEN_SECRET);

  //   return res
  //     .cookie("auth_token", token, {
  //       httpOnly: true,
  //     })
  //     .status(200)
  //     .json({
  //       data: userDetails,
  //     });
  // });
};

export const logout = async (req, res) => {
  res.cookie("auth_token", "");
  res.clearCookie("auth_token");
  return res.status(200).json({ message: "logout successfully" });
};

export const register = async (req, res) => {
  const {
    phone,
    full_name,
    email,
    password,
    profile_pic,
    farm_name,
    farm_address,
  } = req.body;

  const q = "SELECT * FROM user WHERE `email`=? ";

  db.query(q, [email], (err, data) => {
    if (err) return handleServerError(res);

    if (data.length > 0)
      return res.status(409).json([
        {
          email_error: "Email registered with another account",
        },
      ]);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q =
      "INSERT INTO user(`phone`, `full_name`, `email`, `password`, `profile_pic`, `farm_name`, `farm_address`) VALUES(?)";

    const values = [
      parseInt(phone),
      full_name,
      email,
      hash,
      profile_pic
        ? profile_pic
        : "https://thumbs.dreamstime.com/z/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-solid-icon-121102166.jpg",
      farm_name,
      farm_address,
    ];
  });
};
