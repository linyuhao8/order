const express = require("express");
const router = express.Router();

const productController = require("../../controllers/product/productControllers");

// 產品路由
router.post(
  "/create",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'add product'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'add product',
            schema: {
           "name": "肉燥便當",
           "description": "",
           "price": "100",
           "menu_id": ""
}
    } */
  productController.createProduct
);
router.get(
  "/all",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Get all products'
  productController.getAllProducts
);

router.get(
  "/menu/:menu_id/",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Query all products containing menu_id,Enter menu_id'
  productController.getProductsWithMenuId
);
router.get(
  "/:id",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Find single product'
  productController.getProductById
);
router.put(
  "/:id",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'modify product'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'modify product',
            schema: {
           "name": "肉燥便當",
           "description": "",
           "price": "80",
           "menu_id": ""
}
    } */
  productController.updateProduct
);
router.delete(
  "/:id",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'deleta single product'
  productController.deleteProduct
);
router.get(
  "/merchant/:merchant_id/details",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Check all the menus and products of a particular merchant. Enter merchant_id'
  productController.getMerchantDetails
);

module.exports = router;
