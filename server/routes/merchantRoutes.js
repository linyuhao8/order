const express = require("express");
const router = express.Router();
const merchantController = require("../controllers/merchantRoutes");

// 創建商家
router.post(
  "/",
  // #swagger.tags = ['Merchant']
  // #swagger.summary = '創建商家'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: '商家資料',
            schema: {
            "user_id": "uuid",
            "business_name": "l排骨酥東海商圈",
            "description": "一段說明",
            "feature": "好吃又健康",
            "merchant_logo": "url",
            "location": "台中市西屯區xx路128號"
}
    } */
  merchantController.createMerchant
);

// 獲取所有商家
router.get(
  "/",
  // #swagger.tags = ['Merchant']
  // #swagger.summary = '獲取所有商家'
  merchantController.getAllMerchants
);

// 根據ID獲取單個商家
router.get(
  "/:id",
  // #swagger.tags = ['Merchant']
  // #swagger.summary = '取得單獨商家資料'
  merchantController.getMerchantById
);

// 更新商家信息
router.put(
  "/:id",
  // #swagger.tags = ['Merchant']
  // #swagger.summary = '修改商家訊息'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: '商家資料',
            schema: {
            "user_id": "uuid",
            "business_name": "排骨酥東海商圈",
            "description": "一段說明",
            "feature": "好吃又健康",
            "merchant_logo": "url",
            "location": "台中市西屯區xx路128號"
}
    } */
  merchantController.updateMerchant
);

// 刪除商家
router.delete(
  "/:id",
  // #swagger.tags = ['Merchant']
  // #swagger.summary = '刪除商家'
  merchantController.deleteMerchant
);

module.exports = router;
