const express = require("express");
const router = express.Router();
const optionValueController = require("../../../controllers/product/product_option/optionValueControllers");

// Routes for OptionValue CRUD operations
router.post(
  "/create",
  // #swagger.tags = ['OptionValue']
  // #swagger.summary = 'Add OptionValue'
  optionValueController.createOptionValue
); // Create a new OptionValue
router.get(
  "/all",
  // #swagger.tags = ['OptionValue']
  // #swagger.summary = 'Get OptionValue'
  optionValueController.getAllOptionValues
); // Get all OptionValues
router.get(
  "/:id",
  // #swagger.tags = ['OptionValue']
  // #swagger.summary = 'Get OptionValue By Id'
  optionValueController.getOptionValueById
); // Get OptionValue by ID
router.put(
  "/:id",
  // #swagger.tags = ['OptionValue']
  // #swagger.summary = 'Edit OptionValue By Id'
  optionValueController.updateOptionValue
); // Update OptionValue by ID
router.delete(
  "/:id",
  // #swagger.tags = ['OptionValue']
  // #swagger.summary = 'Delete OptionValue By Id'
  optionValueController.deleteOptionValue
); // Delete OptionValue by ID

module.exports = router;
