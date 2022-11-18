const express = require("express");
const router = express.Router();

const verifyWithJwt = require("../utils/verifyToken");

const transactionControllers = require("../controllers/transactionController");

router.post("/add", verifyWithJwt, transactionControllers.addTransaction);
router.get("/all", verifyWithJwt, transactionControllers.getAllTransactions);
router.put("/:tid", verifyWithJwt, transactionControllers.updateTransaction);
router.delete("/:tid", verifyWithJwt, transactionControllers.deleteTransaction);

module.exports = router;
