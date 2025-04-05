// routes/imageRoutes.js
const express = require("express");
const upload = require("../middlewares/upload");
const imageController = require("../controllers/imageController");

const router = express.Router();
// 上傳圖片
router.post(
  "/",
  // #swagger.tags = ['Image']
  // #swagger.summary = 'use client Upload an image'
  upload.single("image"),
  imageController.uploadImage
);

// 取得所有圖片
router.get(
  "/",
  // #swagger.tags = ['Image']
  // #swagger.summary = 'Get all images'
  imageController.getAllImages
);

// 取得單張圖片
router.get(
  "/:id",
  // #swagger.tags = ['Image']
  // #swagger.summary = 'Get a single image by its ID'
  imageController.getImage
);

// 更新圖片
router.put(
  "/:id",
  // #swagger.tags = ['Image']
  // #swagger.summary = 'Update an image by its ID'
  imageController.updateImage
);

// 刪除圖片
router.delete(
  "/:id",
  // #swagger.tags = ['Image']
  // #swagger.summary = 'Delete an image by its ID'
  imageController.deleteImage
);
module.exports = router;
