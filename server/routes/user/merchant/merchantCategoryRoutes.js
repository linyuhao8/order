const express = require("express");
const router = express.Router();
const merchantCategoryController = require("../../../controllers/user/merchant/merchantCategoriesControllers");

router.post(
  "/",
  // #swagger.tags = ['MerchantCategory']
  // #swagger.summary = 'Add MerchantCategory'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
            "merchant_id": "uuid",
            "name": "",
}
    } */
  merchantCategoryController.createMerchantCategory
);
router.get(
  "/",
  // #swagger.tags = ['MerchantCategory']
  // #swagger.summary = 'Get all MerchantCategorys'
  merchantCategoryController.getAllMerchantCategories
);
router.get(
  "/:id",
  // #swagger.tags = ['MerchantCategory']
  // #swagger.summary = 'Get MerchantCategory by ID'
  merchantCategoryController.getMerchantCategoryById
);
router.put(
  "/:id",
  // #swagger.tags = ['MerchantCategory']
  // #swagger.summary = 'Update MerchantCategory'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
            "merchant_id": "uuid",
            "name": "",
}
    } */
  merchantCategoryController.updateMerchantCategory
);
router.delete(
  "/:id",
  // #swagger.tags = ['MerchantCategory']
  // #swagger.summary = 'Delete MerchantCategory'
  merchantCategoryController.deleteMerchantCategory
);

module.exports = router;
