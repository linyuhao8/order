const express = require("express");
const router = express.Router();
const productImageController = require("../../controllers/product/productImageControllers");

// 取得全部 product images
router.get(
  "/",
  // #swagger.tags = ['ProductImage']
  // #swagger.summary = 'get All Image'
  productImageController.getAll
);

// 取得某個 product 的所有圖片
router.get(
  "/product/:productId",
  // #swagger.tags = ['ProductImage']
  // #swagger.summary = 'get all images by propduct id'
  productImageController.getByProductId
);

// 新增 product image
router.post(
  "/",
  // #swagger.tags = ['ProductImage']
  // #swagger.summary = 'bing product img'
  productImageController.create
);

// 更新 product image (sort_order 或 is_main)
router.put(
  "/:productId/:imageId",
  // #swagger.tags = ['ProductImage']
  // #swagger.summary = 'update'
  productImageController.update
);

// 刪除 product image
router.delete(
  "/:productId/:imageId",
  // #swagger.tags = ['ProductImage']
  // #swagger.summary = 'delete'
  productImageController.delete
);

module.exports = router;
