const express = require("express");
const router = express.Router();

const menuController = require("../../controllers/product/menuControllers");

// 菜單路由
router.post(
  "/create",
  // #swagger.tags = ['Menu']
  // #swagger.summary = 'Add menu,Enter mercant_id'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'add menu',
            schema: {
                "name": "飲料",
                "description": "這是一個菜單的說明",
                "merchant_id": ""
            }
    } */
  menuController.createMenu
);
router.get(
  "/all",
  // #swagger.tags = ['Menu']
  // #swagger.summary = 'Get all menu'
  menuController.getAllMenus
);
// 查詢某個商家的所有菜單
router.get(
  "/merchant/:merchant_id",
  // #swagger.tags = ['Menu']
  // #swagger.summary = 'Find all the menus of a merchant, Enter merchant_id'
  menuController.getMenusByMerchant
);

router.get(
  "/:id",
  // #swagger.tags = ['Menu']
  // #swagger.summary = 'Find single menu'
  menuController.getMenuById
);
router.put(
  "/:id",

  // #swagger.tags = ['Menu']
  // #swagger.summary = 'edit menu'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'edit menu',
            schema: {
                "name": "飲料",
                "description": "這是一個菜單的說明",
                "merchant_id": ""
            }
    } */
  menuController.updateMenu
);
router.delete(
  "/:id",
  // #swagger.tags = ['Menu']
  // #swagger.summary = 'Delete menu,Enter menu_id,All data related to the product will be deleted.'
  menuController.deleteMenu
);

module.exports = router;
