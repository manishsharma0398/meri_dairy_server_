const { db } = require("../database/db");
const { getUserId } = require("../utils/userId");
const { handleServerError } = require("../utils/errorHandler");

module.exports.addMating = (req, res) => {
  const {
    a_id,
    date,
    bull_or_ai,
    bull_or_semen_name,
    bull_or_semen_id,
    breed,
    semen_brand,
    cost,
    success,
  } = req.body;
  const q =
    "INSERT INTO mating(`a_id`, `u_id`, `date`, `bull_or_ai`,`bull_or_semen_name`, `breed`, `cost`,`success`,`semen_brand`, `bull_or_semen_id`) VALUES(?)";
  const values = [
    a_id,
    getUserId(req),
    date,
    bull_or_ai,
    bull_or_semen_name,
    breed,
    cost,
    success,
    semen_brand,
    bull_or_semen_id,
  ];

  db.query(q, [values], (err) => {
    if (err) return handleServerError(res);

    return res.status(201).json({ message: "Mating added successfully" });
  });
};

module.exports.getAllMating = (req, res) => {
  const q = "SELECT * FROM mating WHERE `user_id`=?";
  const values = [getUserId(req)];
  db.query(q, [values], (err, data) => {
    if (err) return handleServerError(res);

    return res.status(200).json(data);
  });
};

module.exports.updateMating = (req, res) => {
  const {
    a_id,
    date,
    bull_or_ai,
    bull_or_semen_name,
    bull_or_semen_id,
    breed,
    semen_brand,
    cost,
    success,
  } = req.body;
  const matingId = req.params.mid;
  //   const q =
  //     "INSERT INTO mating(`a_id`, `u_id`, `date`, `bull_or_ai`,`bull_or_semen_name`, `breed`, `cost`,`success`,`semen_brand`, `bull_or_semen_id`) VALUES(?)";
  const values = [
    a_id,
    getUserId(req),
    date,
    bull_or_ai,
    bull_or_semen_name,
    breed,
    cost,
    success,
    semen_brand,
    bull_or_semen_id,
  ];
  db.query("", [values], (err, data) => {
    if (err) return handleServerError(res);

    return console.log(data);
  });
};

module.exports.deleteMating = (req, res) => {
  const matingId = req.params.mid;
  const q = "DELETE FROM mating WHERE `id`=? AND `user_id`=?";
  db.query(q, [matingId, getUserId(req)], async (err, data) => {
    if (err) return await handleServerError(res);
    return res.status(200).json({ message: "mating Deleted Successfully" });
  });
};
