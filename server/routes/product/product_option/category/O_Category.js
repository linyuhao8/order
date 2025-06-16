const express = require("express");
const router = express.Router();
const oCategoryController = require("../../../../controllers/product/product_option/category/o_categoryController");

// 新增 O_Category
router.post(
  "/",
  // #swagger.tags = ['O_Category']
  oCategoryController.createOCategory
);

// 取得所有 O_Category
router.get(
  "/",
  // #swagger.tags = ['O_Category']
  oCategoryController.getAllOCategories
);

// 取得指定 ID 的 O_Category
router.get(
  "/:id",
  // #swagger.tags = ['O_Category']
  oCategoryController.getOCategoryById
);

// 更新 O_Category
router.put(
  "/:id",
  // #swagger.tags = ['O_Category']
  oCategoryController.updateOCategory
);

// 刪除 O_Category
router.delete(
  "/:id",
  // #swagger.tags = ['O_Category']
  oCategoryController.deleteOCategory
);

module.exports = router;
