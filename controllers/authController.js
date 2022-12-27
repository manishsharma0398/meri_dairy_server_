const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  register_validator,
  login_validator,
} = require("../validation/authValidator");
const { db } = require("../database/db");
const { handleServerError } = require("../utils/errorHandler");

module.exports.register = async (req, res) => {
  const {
    phone,
    full_name,
    email,
    password,
    profile_pic,
    farm_name,
    farm_address,
  } = req.body;

  try {
    await register_validator.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (errors) {
    const authErr = [];
    errors.details.forEach((err) => {
      const key = err.path[0] + "_error";
      const obj = {};
      obj[key] = err.message;
      authErr.push(obj);
    });
    return res.status(409).json(authErr);
  }

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

    db.query(q, [values], (err, data) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          const errMsg = err.sqlMessage;
          const errorSqlField = errMsg
            .split("key ")[1]
            .split(".")[1]
            .split("_")[0];
          console.log(errorSqlField);

          return res.status(409).json([
            {
              phone_error: "Mobile Number registered with another account",
            },
          ]);
        }
        return handleServerError(res);
      }

      return res.status(201).json({
        message: "User Registered Successfully",
      });
    });
  });
};

module.exports.login = async (req, res) => {
  try {
    await login_validator.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (errors) {
    const authErr = [];
    errors.details.forEach((err) => {
      const key = err.path[0] + "_error";
      const obj = {};
      obj[key] = err.message;
      authErr.push(obj);
    });
    return res.status(409).json(authErr);
  }

  const q = "SELECT * FROM user WHERE `email`=?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return handleServerError(res);

    if (data.length === 0)
      return res.status(404).json([
        {
          email_error: "No user registered with this email",
        },
      ]);

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json([
        {
          password_error: "Password Incorrect",
        },
      ]);

    const { id, password, ...userDetails } = data[0];

    const token = jwt.sign({ id }, process.env.TOKEN_SECRET);

    return res
      .cookie("auth_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        data: userDetails,
      });
  });
};

module.exports.logout = async (req, res) => {
  res.cookie("auth_token", "");
  res.clearCookie("auth_token");
  return res.status(200).json({ message: "logout successfully" });
};
