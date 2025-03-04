const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menuControllers");

// 菜單路由
router.post(
  "/menus",
  // #swagger.tags = ['Menus']
  // #swagger.summary = '創建用戶'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: '新增菜單',
            schema: {
                "name": "飲料",
                "description": "這是一個菜單的說明",
                "merchant_id": "weejwoihweohqw"
            }
    } */
  menuController.createMenu
);
router.get(
  "/menus",
  // #swagger.tags = ['Menus']
  // #swagger.summary = '查詢所有菜單'
  menuController.getAllMenus
);
// 查詢某個商家的所有菜單
router.get(
  "/merchant/:merchant_id/menus",
  // #swagger.tags = ['Menus']
  // #swagger.summary = '查詢某個商家的所有菜單'
  menuController.getMenusByMerchant
);

router.get(
  "/menus/:id",
  // #swagger.tags = ['Menus']
  // #swagger.summary = '查詢單獨菜單'
  menuController.getMenuById
);
router.put(
  "/menus/:id",

  // #swagger.tags = ['Menus']
  // #swagger.summary = '編輯單獨菜單'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: '新增菜單',
            schema: {
                "name": "飲料",
                "description": "這是一個菜單的說明",
                "merchant_id": "weejwoihweohqw"
            }
    } */
  menuController.updateMenu
);
router.delete(
  "/menus/:id",
  // #swagger.tags = ['Menus']
  // #swagger.summary = '刪除單獨菜單'
  menuController.deleteMenu
);

module.exports = router;
