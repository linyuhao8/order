const express = require("express");
const router = express.Router();
const optionCategoryController = require("../../../../controllers/product/product_option/category/optionCategoryController");

// 新增 OptionCategory
router.post(
  "/",
  // #swagger.tags = ['Option_Category']
  optionCategoryController.createOptionCategory
);

// 取得所有 OptionCategory
router.get(
  "/",
  // #swagger.tags = ['Option_Category']
  optionCategoryController.getAllOptionCategories
);

// 取得指定 ID 的 OptionCategory
router.get(
  "/:id",
  // #swagger.tags = ['Option_Category']
  optionCategoryController.getOptionCategoryById
);

// 更新 OptionCategory
router.put(
  "/:id",
  // #swagger.tags = ['Option_Category']
  optionCategoryController.updateOptionCategory
);

// 刪除 OptionCategory
router.delete(
  "/:id",
  // #swagger.tags = ['Option_Category']
  optionCategoryController.deleteOptionCategory
);

module.exports = router;
