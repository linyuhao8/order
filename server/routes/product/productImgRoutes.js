const express = require("express");
const router = express.Router();
const productImgController = require("../../controllers/product/productImgControllers");

router.post(
  "/",
  // #swagger.tags = ['ProductImg']
  // #swagger.summary = 'Add ProductImg ,enter product_id'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'add menu',
            schema: {
  "product_id": "67c01da4-6c1e-434d-a909-6f8bbcfdcf9c",
  "image_url": "https://images.deliveryhero.io/image/fd-tw/Products/3524648.jpg??width=400",
  "title": "青茶",
  "description": "說明"
}
    } */
  productImgController.createProductImg
);
router.get(
  "/",
  // #swagger.tags = ['ProductImg']
  // #swagger.summary = 'Get All ProductImg'
  productImgController.getAllProductImgs
);
router.get(
  "/:id",
  // #swagger.tags = ['ProductImg']
  // #swagger.summary = 'find single productImg ,enter productImg_id'
  productImgController.getProductImgById
);
router.put(
  "/:id",
  // #swagger.tags = ['ProductImg']
  // #swagger.summary = 'edit productImg info,enter product_id'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'add menu',
            schema: {
  "image_url": "https://images.deliveryhero.io/image/fd-tw/Products/3524648.jpg??width=400",
  "title": "青茶",
  "description": "說明"
}
    } */
  productImgController.updateProductImg
);
router.delete(
  "/:id",
  // #swagger.tags = ['ProductImg']
  // #swagger.summary = 'Delete ProductImg'
  productImgController.deleteProductImg
);

router.get(
  "/product/:id/images",
  // #swagger.tags = ['ProductImg']
  // #swagger.summary = 'Photo of the Product taken with the product_id,Enter Product_id'
  productImgController.getAllImgByProductId
);

module.exports = router;
