const { Category, Option } = require("../../../config/postgreSql").db;

const {
  createOptionSchema,
  updateOptionSchema,
} = require("../../../validations/product/product_option/optionValidation");

// Create a new Option
async function createOption(req, res) {
  // Joi 驗證輸入資料
  const { error } = createOptionSchema.validate(req.body, {
    abortEarly: false, // 允許顯示所有錯誤
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    const { name, category_id, type } = req.body;
    if (category_id) {
      const checkCategory = await Category.findByPk(category_id);
      if (!checkCategory) {
        return res.status(400).json({ message: "can't not find category" });
      }
    }

    const option = await Option.create({ name, category_id, type });
    return res.status(201).json(option);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Get all Options
async function getAllOptions(req, res) {
  try {
    const options = await Option.findAll();
    if (options.length === 0) {
      return res.status(404).json({ message: "No options found." });
    }
    return res.status(200).json(options);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Get Option by ID
async function getOptionById(req, res) {
  try {
    const option = await Option.findByPk(req.params.id);
    if (!option) {
      return res.status(404).json({ message: "Option not found." });
    }
    return res.status(200).json(option);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Update an Option
async function updateOption(req, res) {
  // Joi 驗證輸入資料
  const { error } = updateOptionSchema.validate(req.body, {
    abortEarly: false, // 允許顯示所有錯誤
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    const option = await Option.findByPk(req.params.id);
    if (!option) {
      return res.status(404).json({ message: "Option not found." });
    }

    const { name, category_id, type } = req.body;
    const checkCategory = await Category.findByPk(category_id);
    if (!checkCategory) {
      return res.status(400).json({ message: "can't not find category" });
    }

    const updatedOption = await option.update({ name, category_id, type });
    return res.status(200).json(updatedOption);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Delete an Option
async function deleteOption(req, res) {
  try {
    const option = await Option.findByPk(req.params.id);
    if (!option) {
      return res.status(404).json({ message: "Option not found." });
    }

    await option.destroy();
    return res.status(204).send(); // Successfully deleted, no content returned
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createOption,
  getAllOptions,
  getOptionById,
  updateOption,
  deleteOption,
};
