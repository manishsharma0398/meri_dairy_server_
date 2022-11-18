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
    console.log(err);
    if (err) return handleServerError(req);

    return res.status(201).json({ message: "Worker added successfully" });
  });
};

module.exports.getAllWorkers = (req, res) => {
  const q = "SELECT * FROM worker WHERE `user_id`=?";
  const values = [getUserId(req)];
  db.query(q, [values], (err, data) => {
    console.log(err);
    if (err) return handleServerError(res);

    return res.status(200).json(data);
  });
};

module.exports.updateHealth = (req, res) => {
  const { animal_id, treatment_type, date, medicine } = req.body;

  const healthId = req.params.hid;
  const q =
    "UPDATE health (`animal_id`, `treatment_type`, `date`, `medicine`) VALUES(?,?,?,?) WHERE `id`=?";
  const values = [
    animal_id,
    treatment_type,
    date,
    medicine,
    healthId,
    getUserId(req),
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return console.log(err);
    }
    return console.log(data);
  });
};

module.exports.deleteWorker = (req, res) => {
  const workerId = req.params.wid;
  const q = "DELETE FROM worker WHERE `id`=? AND `user_id`=?";
  db.query(q, [workerId, getUserId(req)], async (err, data) => {
    if (err) return await handleServerError(req);
    return res.status(200).json({ message: "Worker Deleted Successfully" });
  });
};
