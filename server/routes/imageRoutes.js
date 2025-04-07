const express = require("express");
const router = express.Router();
const { upload, uploadToGCS } = require("../middlewares/gcsUpload");
const imageController = require("../controllers/imageController");

// 上傳圖片：使用 multer 上傳 + 上傳至 GCS
router.post(
  "/",
  upload, // 處理本地文件上傳
  uploadToGCS, // 上傳至 Google Cloud Storage
  // #swagger.tags = ['Image']
  // #swagger.summary = 'Use upload file to post image, and then save it to Google Cloud Storage'
  imageController.uploadImage // 最後執行控制器儲存資料庫邏輯
);

// 取得所有圖片資料
router.get(
  "/",
  // #swagger.tags = ['Image']
  // #swagger.summary = 'Get all images'
  imageController.getAllImages
);

// 依用戶 ID 取得圖片（支援分頁）
// GET /api/images/user/:userId?page=1&limit=20
router.get(
  "/user/:userId",
  // #swagger.tags = ['Image']
  // #swagger.summary = 'Get images by user ID with pagination'
  imageController.getUserImages
);

// 取得單一圖片

router.get(
  "/:id",
  // #swagger.tags = ['Image']
  // #swagger.summary = 'Get image by ID'
  imageController.getImage
);

// 更新圖片資訊

router.put(
  "/:id",
  // #swagger.tags = ['Image']
  // #swagger.summary = 'Update image by ID'
  imageController.updateImage
);

// 刪除圖片
router.delete(
  "/:id",
  // #swagger.tags = ['Image']
  // #swagger.summary = 'Delete image by ID'
  imageController.deleteImage
);

module.exports = router;
