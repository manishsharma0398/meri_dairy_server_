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
