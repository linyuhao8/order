const { Category, Option, OptionValue } =
  require("../../../config/postgreSql").db;

const {
  createOptionSchema,
  updateOptionSchema,
} = require("../../../validations/product/product_option/optionValidation");

// Create a new Option
async function createOption(req, res) {
  const { error } = createOptionSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }

  try {
    const { name, type, description, min_select, max_select } = req.body;

    const option = await Option.create({
      name,
      type,
      description,
      min_select,
      max_select,
    });

    return res.status(201).json({
      message: "新增 Option 成功",
      data: option,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "伺服器錯誤", error: error.message });
  }
}

// Get all Options
async function getAllOptions(req, res) {
  try {
    const options = await Option.findAll();
    return res.status(200).json({
      message: "取得所有 Option 成功",
      data: options,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "伺服器錯誤", error: error.message });
  }
}

// Get Option by ID
async function getOptionById(req, res) {
  try {
    const option = await Option.findByPk(req.params.id, {
      include: [{ model: OptionValue, as: "option_values" }],
    });

    if (!option) {
      return res.status(404).json({ message: "找不到此 Option" });
    }

    return res.status(200).json({
      message: "取得 Option 成功",
      data: option,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "伺服器錯誤", error: error.message });
  }
}

// Update an Option
async function updateOption(req, res) {
  const { error } = updateOptionSchema.validate(req.body, {
    abortEarly: false,
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
      return res.status(404).json({ message: "找不到此 Option" });
    }

    const { name, type, description, min_select, max_select } = req.body;

    await option.update({
      name,

      type,
      description,
      min_select,
      max_select,
    });

    return res.status(200).json({
      message: "更新 Option 成功",
      data: option,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "伺服器錯誤", error: error.message });
  }
}

// Delete an Option
async function deleteOption(req, res) {
  try {
    const option = await Option.findByPk(req.params.id);
    if (!option) {
      return res.status(404).json({ message: "找不到此 Option" });
    }

    await option.destroy();
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "伺服器錯誤", error: error.message });
  }
}

module.exports = {
  createOption,
  getAllOptions,
  getOptionById,
  updateOption,
  deleteOption,
};
