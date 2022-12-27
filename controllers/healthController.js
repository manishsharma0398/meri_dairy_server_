const { db } = require("../database/db");
const { getUserId } = require("../utils/userId");
const { handleServerError } = require("../utils/errorHandler");
const { healthValidator } = require("../validation/healthValidator");

module.exports.addHealth = async (req, res) => {
  try {
    await healthValidator.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (errors) {
    const healthErr = [];
    errors.details.forEach((err) => {
      const key = err.path[0] + "_error";
      const obj = {};
      obj[key] = err.message;
      healthErr.push(obj);
    });
    return res.status(409).json(healthErr);
  }

  const { animal_id, treatment_type, medicine, date } = req.body;
  const q =
    "INSERT INTO health(`animal_id`, `treatment_type`, `medicine`, `date`, `user_id`) VALUES(?)";
  const values = [animal_id, treatment_type, medicine, date, getUserId(req)];
  db.query(q, [values], (err) => {
    console.log(err);
    if (err) return handleServerError(req);

    return res
      .status(201)
      .json({ message: "Health record added successfully" });
  });
};

module.exports.getAllHealth = (req, res) => {
  const q = "SELECT * FROM health WHERE `user_id`=?";
  db.query(q, [getUserId(req)], (err, data) => {
    if (err) return handleServerError(res);

    return res.status(200).json(data);
  });
};

module.exports.updateHealth = async (req, res) => {
  try {
    await healthValidator.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (errors) {
    const milkErr = [];
    errors.details.forEach((err) => {
      const key = err.path[0] + "_error";
      const obj = {};
      obj[key] = err.message;
      milkErr.push(obj);
    });
    return res.status(409).json(milkErr);
  }

  const { animal_id, treatment_type, date, medicine } = req.body;
  const healthId = req.params.hid;
  const q =
    "UPDATE health SET `animal_id`=?, `treatment_type`=?, `date`=?, `medicine`=?  WHERE `id`=? AND `user_id`=?";

  db.query(
    q,
    [animal_id, treatment_type, date, medicine, healthId, getUserId(req)],
    (err, data) => {
      if (err) return handleServerError(res);

      return res.status(200).json({ message: "successfully updated" });
    }
  );
};

module.exports.deleteHealth = (req, res) => {
  const healthId = req.params.hid;
  const q = "DELETE FROM health WHERE `id`=? AND `user_id`=?";
  db.query(q, [healthId, getUserId(req)], async (err, data) => {
    if (err) return await handleServerError(req);
    return res
      .status(200)
      .json({ message: "Health Record Deleted Successfully" });
  });
};
