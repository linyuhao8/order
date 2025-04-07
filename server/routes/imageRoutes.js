const express = require("express");
const router = express.Router();
const { upload, uploadToGCS } = require("../middlewares/gcsUpload");
const imageController = require("../controllers/imageController");

// #swagger.tags = ['Image']
// #swagger.summary = 'Upload image to Google Cloud Storage'
router.post(
  "/",
  upload, // 然后处理文件上传
  uploadToGCS, // 接着上传到 Google Cloud Storage
  imageController.uploadImage // 最后处理控制器逻辑
);
router.get("/", imageController.getAllImages);
router.get("/:id", imageController.getImage);
router.put("/:id", imageController.updateImage);
router.delete("/:id", imageController.deleteImage);

module.exports = router;
