const express = require("express");
const router = express.Router();
const optionController = require("../../../controllers/product/product_option/optionControllers");

// CRUD routes for Option
router.post(
  "/create",
  // #swagger.tags = ['Option']
  // #swagger.summary = 'Add Option'
  optionController.createOption
);
router.get(
  "/all",
  // #swagger.tags = ['Option']
  // #swagger.summary = 'Get Option'
  optionController.getAllOptions
);
router.get(
  "/:id",
  // #swagger.tags = ['Option']
  // #swagger.summary = 'Get Option By Id'
  optionController.getOptionById
);
router.put(
  "/:id",
  // #swagger.tags = ['Option']
  // #swagger.summary = 'Update Option'
  optionController.updateOption
);
router.delete(
  "/:id",
  // #swagger.tags = ['Option']
  // #swagger.summary = 'Delete Option'
  optionController.deleteOption
);

module.exports = router;
