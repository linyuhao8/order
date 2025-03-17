//productOptionRoutes.js
const express = require("express");
const router = express.Router();
const productOptionController = require("../../../controllers/product/product_option/productOptionController");

// 創建 ProductOption
router.post(
  "/product-options",
  // #swagger.tags = ['ProductOption']
  // #swagger.summary = 'Add prductOption'
  productOptionController.createProductOption
);

// 查詢所有 ProductOptions
router.get(
  "/product-options",
  // #swagger.tags = ['ProductOption']
  // #swagger.summary = 'Get All prductOption'
  productOptionController.getAllProductOptions
);

// 查詢單一 ProductOption
router.get(
  "/product-options/:id",
  // #swagger.tags = ['ProductOption']
  // #swagger.summary = 'Get single prductOption by Id'
  productOptionController.getProductOptionById
);

// 更新 ProductOption
router.put(
  "/product-options/:id",
  // #swagger.tags = ['ProductOption']
  // #swagger.summary = 'Update prductOption by Id'
  productOptionController.updateProductOption
);

// 刪除 ProductOption
router.delete(
  "/product-options/:id",
  // #swagger.tags = ['ProductOption']
  // #swagger.summary = 'Delete prductOption by Id'
  productOptionController.deleteProductOption
);

module.exports = router;
