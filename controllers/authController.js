const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../database/db");

module.exports.register = (req, res) => {
  const {
    phone,
    full_name,
    email,
    password,
    profile_pic,
    farm_name,
    farm_address,
  } = req.body;

  const q = "SELECT * FROM users WHERE `email`=? ";

  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0)
      return res.status(409).json({ message: "user already exists" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q =
      "INSERT INTO users(`phone`, `full_name`, `email`, `password`, `profile_pic`, `farm_name`, `farm_address`) VALUES(?)";

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
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};

module.exports.login = (req, res) => {
  const { email } = req.body;
  const q = "SELECT * FROM users WHERE `email`=?";
  db.query(q, [email], (err, data) => {
    if (err) return res.json(err);

    if (data.length === 0)
      return res.status(404).json({ message: "No user found" });

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong login credentials" });

    const { password, ...userDetails } = data[0];

    // create and assign a token
    const token = jwt.sign(userDetails, process.env.TOKEN_SECRET);
    res
      .header("auth-token", token)
      .status(200)
      .json({ access_token: "Bearer " + token });
  });
};
