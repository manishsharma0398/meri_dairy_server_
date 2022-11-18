const express = require("express");
const verifyWithJwt = require("../utils/verifyToken");
const router = express.Router();

const transactionControllers = require("../controllers/transactionController");

router.get("/all", verifyWithJwt, transactionControllers.getAllTransactions);
router.post("/add", verifyWithJwt, transactionControllers.addTransaction);
router.put("/:tid", verifyWithJwt, transactionControllers.updateTransaction);
router.delete("/:tid", verifyWithJwt, transactionControllers.deleteTransaction);

module.exports = router;
