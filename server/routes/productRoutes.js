const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");

// 產品路由
router.post(
  "/products",
  // #swagger.tags = ['Porduct']
  // #swagger.summary = '新增商品'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: '新增菜單',
            schema: {
           "name": "肉燥便當",
           "description": "",
           "price": "100",
           "menu_id": "1"
}
    } */
  productController.createProduct
);
router.get(
  "/products",
  // #swagger.tags = ['Porduct']
  // #swagger.summary = '查詢所有商品'
  productController.getAllProducts
);

router.get(
  "/menu/:menu_id/products",
  // #swagger.tags = ['Porduct']
  // #swagger.summary = '查詢包含menu_id的所有產品'
  productController.getProductsWithMenuId
);
router.get(
  "/products/:id",
  // #swagger.tags = ['Porduct']
  // #swagger.summary = '查詢單獨商品'
  productController.getProductById
);
router.put(
  "/products/:id",
  // #swagger.tags = ['Porduct']
  // #swagger.summary = '修改商品'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: '新增菜單',
            schema: {
           "name": "肉燥便當",
           "description": "",
           "price": "80",
           "menu_id": "1"
}
    } */
  productController.updateProduct
);
router.delete(
  "/products/:id",
  // #swagger.tags = ['Porduct']
  // #swagger.summary = '刪除單獨商品'
  productController.deleteProduct
);
router.get(
  "/merchant/:merchant_id/products/details",
  // #swagger.tags = ['Porduct']
  // #swagger.summary = '查詢某個商家的所有菜單跟產品'
  productController.getMerchantDetails
);

module.exports = router;
