const express = require("express");
const router = express.Router();

const productController = require("../../controllers/product/productControllers");

// 產品路由
router.post(
  "/products",
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
  "/products",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Get all products'
  productController.getAllProducts
);

router.get(
  "/menu/:menu_id/products",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Query all products containing menu_id,Enter menu_id'
  productController.getProductsWithMenuId
);
router.get(
  "/products/:id",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Find single product'
  productController.getProductById
);
router.put(
  "/products/:id",
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
  "/products/:id",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'deleta single product'
  productController.deleteProduct
);
router.get(
  "/merchant/:merchant_id/products/details",
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Check all the menus and products of a particular merchant. Enter merchant_id'
  productController.getMerchantDetails
);

module.exports = router;
