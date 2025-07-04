const express = require("express");
const router = express.Router();
const optionCategoryController = require("../../../../controllers/product/product_option/category/OptionCategoryMainController");
// 新增 OptionCategoryMain
router.post(
  "/",
  // #swagger.tags = ['OptionCategoryMain']
  optionCategoryController.createOptionCategoryMain
);

// 取得所有 OptionCategoryMain
router.get(
  "/",
  // #swagger.tags = ['OptionCategoryMain']
  optionCategoryController.getAllOptionCategoryMain
);

// 取得指定 ID 的 OptionCategoryMain
router.get(
  "/:id",
  // #swagger.tags = ['OptionCategoryMain']
  optionCategoryController.getOptionCategoryMainById
);

// 更新 OptionCategoryMain
router.put(
  "/:id",
  // #swagger.tags = ['OptionCategoryMain']
  optionCategoryController.updateOptionCategoryMain
);

// 刪除 OptionCategoryMain
router.delete(
  "/:id",
  // #swagger.tags = ['OptionCategoryMain']
  optionCategoryController.deleteOptionCategoryMain
);

module.exports = router;
