const express = require("express");
const router = express.Router();
const categoryController = require("../../../controllers/product/category/categoryControllers");

// 分類 API
router.post(
  "/p-categories",
  // #swagger.tags = ['P_Category']
  // #swagger.summary = 'Add Category'
  categoryController.createCategory
);
router.put(
  "/p-categories/:id",
  // #swagger.tags = ['P_Category']
  // #swagger.summary = 'modify Category'
  categoryController.updateCategory
);
router.delete(
  "/p-categories/:id",
  // #swagger.tags = ['P_Category']
  // #swagger.summary = 'Delete Category'
  categoryController.deleteCategory
);
router.get(
  "/p-categories",
  // #swagger.tags = ['P_Category']
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
