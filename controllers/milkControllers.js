const { db } = require("../database/db");
const { getUserId } = require("../utils/userId");
const { handleServerError } = require("../utils/errorHandler");
const { milkValidator } = require("../validation/milkValidator");

module.exports.addMilkData = async (req, res) => {
  try {
    await milkValidator.validateAsync(req.body, {
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
  const { a_id, time, date, quantity } = req.body;
  const q =
    "INSERT INTO milk(`a_id`, `time`, `date`, `quantity`, `u_id`) VALUES(?)";
  const values = [a_id, time, date, quantity, getUserId(req)];
  db.query(q, [values], async (err) => {
    if (err) return handleServerError(res);
    return res.status(201).json({ data: "Milk Added Successfully" });
  });
};

module.exports.getAllMilkData = (req, res) => {
  const q = "SELECT * FROM milk WHERE `u_id`=?";
  db.query(q, [getUserId(req)], async (err, data) => {
    if (err) return handleServerError(res);

    return res.status(200).json(data);
  });
};

module.exports.getMilkData = (req, res) => {
  const milkId = req.params.mid;
  const q = "SELECT * FROM milk WHERE `id`=? AND `u_id`=? ";
  const values = [milkId, getUserId(req)];
  db.query(q, [values], async (err) => {
    if (err) return handleServerError(res, data);
    return res.status(200).json(data);
  });
};

module.exports.updateMilkData = async (req, res) => {
  try {
    await milkValidator.validateAsync(req.body, {
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

  const { a_id, time, date, quantity } = req.body;
  const milkId = req.params.mid;

  const q =
    "UPDATE milk SET `a_id`=?, `time`=?, `date`=?, `quantity`=? WHERE `id`=? AND `u_id`=? ";

  db.query(
    q,
    [a_id, time, date, quantity, milkId, getUserId(req)],
    async (err) => {
      if (err) return handleServerError(res);
      return res
        .status(200)
        .json({ message: "Milk Record Updated Successfully" });
    }
  );
};

module.exports.deleteMilkData = (req, res) => {
  const milkId = req.params.mid;
  const q = "DELETE FROM milk WHERE `id`=? AND `u_id`=?";
  db.query(q, [milkId, getUserId(req)], async (err) => {
    if (err) return handleServerError(res);

    res.status(204).json({ message: "Milk Deleted Successfully" });
  });
};
