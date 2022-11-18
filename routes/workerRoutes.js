const express = require("express");
const router = express.Router();

const verifyWithJwt = require("../utils/verifyToken");

const workerControllers = require("../controllers/workerController");

router.post("/add", verifyWithJwt, workerControllers.addWorker);
router.get("/all", verifyWithJwt, workerControllers.getAllWorkers);
router.put("/:wid", verifyWithJwt, workerControllers.updateWorker);
router.delete("/:wid", verifyWithJwt, workerControllers.deleteWorker);

module.exports = router;
