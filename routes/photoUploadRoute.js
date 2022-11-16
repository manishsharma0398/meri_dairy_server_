const express = require("express");
const router = express.Router();
const verifyWithJwt = require("../utils/verifyToken");
const { cloudinary } = require("../utils/cloudinary");
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage });
const { handleServerError } = require("../utils/errorHandler");

router.post(
  "/",
  verifyWithJwt,
  upload.single("photo_url"),
  async (req, res) => {
    try {
      const fileStr = req.file.path;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr);
      return res.status(200).json({ data: uploadedResponse.url });
    } catch (error) {
      console.log(error);
      return handleServerError(res);
    }
  }
);

module.exports = router;
