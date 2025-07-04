const express = require("express");
const router = express.Router();
const categoryController = require("../../../controllers/user/merchant/merchantCategoriesControllers");

router.post(
  "/",
  // #swagger.tags = ['MerchantCategoryMain']
  // #swagger.summary = '建立類別'
  /*  
      #swagger.parameters['body'] = {
        in: 'body',
        description: '更新類別資料',
        schema: {
          "name": "新名稱",
          "description": "新說明",
          "image_id": "uuid"
        }
      } */

  categoryController.createCategory
);

router.get(
  "/",
  // #swagger.tags = ['MerchantCategoryMain']
  // #swagger.summary = '取得所有類別'
  categoryController.getAllCategories
);

router.get(
  "/:id",
  // #swagger.tags = ['MerchantCategoryMain']
  // #swagger.summary = '取得單一類別'
  /*  #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'integer',
        description: '類別 ID'
      } */
  categoryController.getCategoryById
);

router.put(
  "/:id",
  // #swagger.tags = ['MerchantCategoryMain']
  // #swagger.summary = '更新類別'
  /*  
      #swagger.parameters['body'] = {
        in: 'body',
        description: '更新類別資料',
        schema: {
          "name": "新名稱",
          "description": "新說明",
          "image_id": "uuid"
        }
      } */
  categoryController.updateCategory
);

router.delete(
  "/:id",
  // #swagger.tags = ['MerchantCategoryMain']
  // #swagger.summary = '刪除類別'
  /*  #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'integer',
        description: '類別 ID'
      } */
  categoryController.deleteCategory
);

// ────────────────────────────
// 🔹 MerchantCategory（中間表）
// ────────────────────────────

router.post(
  "/merchant",
  // #swagger.tags = ['MerchantCategory']
  // #swagger.summary = '新增類別到商家'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: '商家與類別關聯',
        schema: {
          "merchant_id": "uuid",
          "category_id": 2
        }
      } */
  categoryController.addCategoryToMerchant
);

router.delete(
  "/merchant/:merchant_id/:category_id",
  // #swagger.tags = ['MerchantCategory']
  // #swagger.summary = '從商家移除類別'
  /*  #swagger.parameters['category_id'] = {
        in: 'path',
        required: true,
        type: 'integer',
        description: '類別 ID'
      } */
  categoryController.removeCategoryFromMerchant
);

// 1️⃣ 查詢某商家的所有分類
router.get(
  "/merchant/:merchant_id/categories",
  // #swagger.tags = ['MerchantCategory']
  // #swagger.summary = '取得商家所有分類'

  categoryController.getCategoriesByMerchant
);

// 2️⃣ 查詢某個類別下的所有商家
router.get(
  "/category/:category_id/merchants",
  // #swagger.tags = ['MerchantCategory']
  // #swagger.summary = '取得某類別的所有商家'

  categoryController.getMerchantsByCategory
);

// 3️⃣ 查詢某個類別下有多少商家
router.get(
  "/category/:category_id/merchants/count",
  // #swagger.tags = ['MerchantCategory']
  // #swagger.summary = '取得某類別下商家的數量'

  categoryController.getMerchantsCountByCategory
);

module.exports = router;
