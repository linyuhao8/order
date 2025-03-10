const { OptionValue, Option } = require("../../../config/postgreSql").db; // Import OptionValue model
const { Op } = require("sequelize"); // Sequelize operators for complex queries
const {
  createOptionValueSchema,
  updateOptionValueSchema,
} = require("../../../validations/product/product_option/optionValueValidation");

// Create a new OptionValue
async function createOptionValue(req, res) {
  const { error } = createOptionValueSchema.validate(req.body, {
    abortEarly: false, // 允許顯示所有錯誤
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    // Destructure the request body
    const { option_id, option_values, extra_price } = req.body;
    const checkOptionId = await Option.findByPk(option_id);
    if (!checkOptionId) {
      return res.status(400).json({ message: "can't not find optionId" });
    }
    // Create a new OptionValue
    const newOptionValue = await OptionValue.create({
      option_id,
      option_values,
      extra_price,
    });

    return res.status(201).json(newOptionValue);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Get all OptionValues
async function getAllOptionValues(req, res) {
  try {
    const optionValues = await OptionValue.findAll();

    if (optionValues.length === 0) {
      return res.status(404).json({ message: "No option values found." });
    }

    return res.status(200).json(optionValues);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Get OptionValue by ID
async function getOptionValueById(req, res) {
  try {
    const optionValue = await OptionValue.findByPk(req.params.id);
    if (!optionValue) {
      return res.status(404).json({ message: "OptionValue not found." });
    }

    return res.status(200).json(optionValue);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Update an existing OptionValue
async function updateOptionValue(req, res) {
  const { error } = updateOptionValueSchema.validate(req.body, {
    abortEarly: false, // 允許顯示所有錯誤
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    const { option_values, extra_price } = req.body;

    // Find the OptionValue by ID
    const optionValue = await OptionValue.findByPk(req.params.id);

    if (!optionValue) {
      return res.status(404).json({ message: "OptionValue not found." });
    }

    // Update the OptionValue
    const updatedOptionValue = await optionValue.update({
      option_values,
      extra_price,
    });

    return res.status(200).json(updatedOptionValue);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Delete OptionValue
async function deleteOptionValue(req, res) {
  try {
    // Find the OptionValue by ID
    const optionValue = await OptionValue.findByPk(req.params.id);

    if (!optionValue) {
      return res.status(404).json({ message: "OptionValue not found." });
    }

    // Delete the OptionValue
    await optionValue.destroy();

    return res
      .status(200)
      .json({ message: "OptionValue deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Export the controller functions
module.exports = {
  createOptionValue,
  getAllOptionValues,
  getOptionValueById,
  updateOptionValue,
  deleteOptionValue,
};
