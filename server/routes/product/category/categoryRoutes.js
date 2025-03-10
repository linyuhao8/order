const express = require("express");
const router = express.Router();
const categoryController = require("../../../controllers/product/category/categoryControllers");

// 分類 API
router.post(
  "/categories",
  // #swagger.tags = ['Category']
  // #swagger.summary = 'Add Category'
  categoryController.createCategory
);
router.put(
  "/categories/:id",
  // #swagger.tags = ['Category']
  // #swagger.summary = 'modify Category'
  categoryController.updateCategory
);
router.delete(
  "/categories/:id",
  // #swagger.tags = ['Category']
  // #swagger.summary = 'Delete Category'
  categoryController.deleteCategory
);
router.get(
  "/categories",
  // #swagger.tags = ['Category']
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
