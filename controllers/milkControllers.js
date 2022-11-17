const { db } = require("../database/db");
const { getUserId } = require("../utils/userId");
const { handleServerError } = require("../utils/errorHandler");

module.exports.addMilkData = (req, res) => {
  const { animal, time, date, quantity } = req.body;

  const q =
    "INSERT INTO milk(`a_id`, `time`, `date`, `quantity`, `u_id`) VALUES(?)";
  const values = [animal, time, date, quantity, getUserId(req)];
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
  const { mid } = req.params;
  const q = "SELECT * FROM milk WHERE `id`=? AND `u_id`=? ";
  const values = [mid, getUserId(req)];
  db.query(q, [values], async (err) => {
    if (err) return handleServerError(res, data);
    return res.status(200).json({ data });
  });
};

module.exports.updateMilkData = (req, res) => {
  const { animal, time, date, quantity } = req.body;
  const { mid } = req.params;

  const q =
    "UPDATE milk SET `a_id`=?, `time`=?, `date`=?, `quantity`=? WHERE `id`=? AND `u_id`=? ";
  const values = [animal, time, date, quantity, mid, getUserId(req)];
  db.query(q, [values], async (err) => {
    console.log(err);
    if (err) return handleServerError(res);
    return res.status(201).json({ data: "Milk Record Updated Successfully" });
  });
};

module.exports.deleteMilkData = (req, res) => {
  const { mid } = req.params;
  const q = "DELETE FROM milk WHERE `id`=? AND `u_id`=?";
  db.query(q, [mid, getUserId(req)], async (err) => {
    if (err) return handleServerError(res);

    res.status(204).json({ data: "Milk Deleted Successfully" });
  });
};
