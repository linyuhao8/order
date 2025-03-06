const express = require("express");
const router = express.Router();
const merchantController = require("../../controllers/user/merchantRoutes");

// 創建商家
router.post(
  "/",
  // #swagger.tags = ['Merchant']
  // #swagger.summary = 'create merchant'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'merchant info',
            schema: {
            "user_id": "uuid",
            "business_name": "好吃排骨酥東海商圈",
            "description": "一段說明",
            "feature": "好吃又健康",
            "merchant_logo": "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "location": "台中市西屯區xx路128號"
}
    } */
  merchantController.createMerchant
);

// 獲取所有商家
router.get(
  "/",
  // #swagger.tags = ['Merchant']
  // #swagger.summary = 'find all merchant'
  merchantController.getAllMerchants
);

// 根據ID獲取單個商家
router.get(
  "/:id",
  // #swagger.tags = ['Merchant']
  // #swagger.summary = 'find single merchant'
  merchantController.getMerchantById
);

// 更新商家信息
router.put(
  "/:id",
  // #swagger.tags = ['Merchant']
  // #swagger.summary = 'modify merchant info'
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
  // #swagger.summary = 'delete merchant'
  merchantController.deleteMerchant
);

module.exports = router;
