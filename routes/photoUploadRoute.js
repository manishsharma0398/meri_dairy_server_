const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({});
const upload = multer({ storage });

const { cloudinary } = require("../utils/cloudinary");
const verifyWithJwt = require("../utils/verifyToken");
const { handleServerError } = require("../utils/errorHandler");

router.post(
  "/",
  verifyWithJwt,
  upload.single("photo_url"),
  async (req, res) => {
    try {
      const fileStr = req.file.path;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr);
      return res.status(201).json({ data: uploadedResponse.url });
    } catch (error) {
      console.log(error);
      return handleServerError(res);
    }
  }
);

module.exports = router;
