const { db } = require("../database/db");
const { getUserId } = require("../utils/userId");
const { handleServerError } = require("../utils/errorHandler");

module.exports.addTransaction = (req, res) => {
  const { title, remarks, amount, mode, date, type } = req.body;
  const q =
    "INSERT INTO transaction(`title`, `remarks`, `amount`, `mode`, `date`, `type`, `user_id`) VALUES(?)";
  const values = [title, remarks, amount, mode, date, type, getUserId(req)];

  db.query(q, [values], (err) => {
    if (err) return handleServerError(res);

    return res.status(201).json({ message: "Transaction added successfully" });
  });
};

module.exports.getAllTransactions = (req, res) => {
  const q = "SELECT * FROM transaction WHERE `user_id`=?";
  const values = [getUserId(req)];
  db.query(q, [values], (err, data) => {
    if (err) return handleServerError(res);

    return res.status(200).json(data);
  });
};

module.exports.updateTransaction = (req, res) => {
  const { title, remarks, amount, mode, date, type } = req.body;
  const transactionId = req.params.tid;
  const q =
    "UPDATE transaction(`title`, `remarks`, `amount`, `mode`, `date`, `type`) VALUES(?) WHERE `id`=? AND `user_id`=?";
  const values = [
    title,
    remarks,
    amount,
    mode,
    date,
    type,
    transactionId,
    getUserId(req),
  ];
  db.query("", [values], (err, data) => {
    if (err) {
      return console.log(err);
    }
    return console.log(data);
  });
};

module.exports.deleteTransaction = (req, res) => {
  const transactionId = req.params.tid;
  const q = "DELETE FROM transaction WHERE `id`=? AND `user_id`=?";
  db.query(q, [transactionId, getUserId(req)], async (err, data) => {
    if (err) return await handleServerError(res);
    return res
      .status(200)
      .json({ message: "transaction Deleted Successfully" });
  });
};
