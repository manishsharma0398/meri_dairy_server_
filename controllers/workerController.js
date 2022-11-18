const { db } = require("../database/db");
const { getUserId } = require("../utils/userId");
const { handleServerError } = require("../utils/errorHandler");

module.exports.addWorker = (req, res) => {
  const { name, email, address, profile_pic, date_joined, salary, remarks } =
    req.body;
  const q =
    "INSERT INTO worker(`name`, `email`, `address`, `profile_pic`, `date_joined`, `salary`, `remarks`, `user_id`) VALUES(?)";
  const values = [
    name,
    email,
    address,
    profile_pic,
    date_joined,
    salary,
    remarks,
    getUserId(req),
  ];

  db.query(q, [values], (err) => {
    if (err) return handleServerError(req);

    return res.status(201).json({ message: "Worker added successfully" });
  });
};

module.exports.getAllWorkers = (req, res) => {
  const q = "SELECT * FROM worker WHERE `user_id`=?";
  const values = [getUserId(req)];
  db.query(q, [values], (err, data) => {
    if (err) return handleServerError(res);

    return res.status(200).json(data);
  });
};

module.exports.updateWorker = (req, res) => {
  const { name, email, address, profile_pic, date_joined, salary, remarks } =
    req.body;
  const workerId = req.params.wid;
  const q =
    "UPDATE worker SET `name`=?, `email`=?, `address`=?, `profile_pic`=?, `date_joined`=?, `salary`=?, `remarks`=? WHERE `id`=? AND `user_id`=?";

  db.query(
    q,
    [
      name,
      email,
      address,
      profile_pic,
      date_joined,
      salary,
      remarks,
      workerId,
      getUserId(req),
    ],
    (err, data) => {
      if (err) return handleServerError(res);
      return res.status(200).json({ message: "Updated successfully" });
    }
  );
};

module.exports.deleteWorker = (req, res) => {
  const workerId = req.params.wid;
  const q = "DELETE FROM worker WHERE `id`=? AND `user_id`=?";
  db.query(q, [workerId, getUserId(req)], async (err, data) => {
    if (err) return await handleServerError(req);
    return res.status(200).json({ message: "Worker Deleted Successfully" });
  });
};
