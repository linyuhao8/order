const express = require("express");
const router = express.Router();
const merchantController = require("../../../controllers/user/merchant/merchantControllers");
const upload = require("../../../middlewares/upload");
// 創建商家
router.post(
  "/create",
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
            "merchant_logo": "Upload files from the front-end, this route will automatically process the URLs and save them to the database.",
            "location": "台中市西屯區xx路128號"
}
    } */
  upload.single("merchant_logo"),
  merchantController.createMerchant
);

// 獲取所有商家
router.get(
  "/all",
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

//取得某個user id的所有商家
router.get(
  "/user/:id/merchants",
  // #swagger.tags = ['Merchant']
  // #swagger.summary = 'Get All Merchant by User Id'
  merchantController.getAllMerchantByUserId
);

module.exports = router;
