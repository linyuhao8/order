const express = require("express");
const router = express.Router();
const categoryController = require("../../../controllers/product/category/categoryControllers");

// 分類 API mix join table and main table
router.post(
  "/product-categories-main",
  // #swagger.tags = ['ProductCategoryMain']
  // #swagger.summary = 'Add Category'
  categoryController.createCategory
);
router.put(
  "/product-categories-main/:id",
  // #swagger.tags = ['ProductCategoryMain']
  // #swagger.summary = 'modify Category'
  categoryController.updateCategory
);
router.delete(
  "/product-categories-main/:id",
  // #swagger.tags = ['ProductCategoryMain']
  // #swagger.summary = 'Delete Category'
  categoryController.deleteCategory
);
router.get(
  "/product-categories-main",
  // #swagger.tags = ['ProductCategoryMain']
  // #swagger.summary = 'Get All Category'
  categoryController.getAllCategories
);

// 產品與分類關聯 API
router.post(
  "/product-categories",
  // #swagger.tags = ['ProductCategory']
  // #swagger.summary = 'Add ProductCategory'
  categoryController.addCategoryToProduct
);
router.delete(
  "/product-categories",
  // #swagger.tags = ['ProductCategory']
  // #swagger.summary = 'Delete ProductCategory'
  categoryController.removeCategoryFromProduct
);
router.get(
  "/products/:productId/categories",
  // #swagger.tags = ['ProductCategory']
  // #swagger.summary = 'Get All Categories by Product_id'
  categoryController.getProductCategories
);

module.exports = router;
