const { OptionValue, Option } = require("../../../config/postgreSql").db;
const {
  createOptionValueSchema,
  updateOptionValueSchema,
} = require("../../../validations/product/product_option/optionValueValidation");

// Create a new OptionValue
async function createOptionValue(req, res) {
  const { error } = createOptionValueSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }

  try {
    const {
      option_id,
      value,
      extra_price = 0,
      is_default = false,
      sort_order = null,
    } = req.body;

    const option = await Option.findByPk(option_id);
    if (!option) {
      return res.status(400).json({ message: "找不到對應的 Option" });
    }

    const newOptionValue = await OptionValue.create({
      option_id,
      value,
      extra_price,
      is_default,
      sort_order,
    });

    return res.status(201).json({
      message: "新增 OptionValue 成功",
      data: newOptionValue,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "伺服器錯誤", error: error.message });
  }
}

// Get all OptionValues
async function getAllOptionValues(req, res) {
  try {
    const optionValues = await OptionValue.findAll();

    return res.status(200).json({
      message: "取得所有 OptionValue 成功",
      data: optionValues,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "伺服器錯誤", error: error.message });
  }
}

// Get OptionValue by ID
async function getOptionValueById(req, res) {
  try {
    const optionValue = await OptionValue.findByPk(req.params.id);

    if (!optionValue) {
      return res.status(404).json({ message: "找不到此 OptionValue" });
    }

    return res.status(200).json({
      message: "取得 OptionValue 成功",
      data: optionValue,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "伺服器錯誤", error: error.message });
  }
}

// Update OptionValue
async function updateOptionValue(req, res) {
  const { error } = updateOptionValueSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }

  try {
    const optionValue = await OptionValue.findByPk(req.params.id);
    if (!optionValue) {
      return res.status(404).json({ message: "找不到此 OptionValue" });
    }

    const { value, extra_price, is_default, sort_order } = req.body;

    await optionValue.update({
      value,
      extra_price,
      is_default,
      sort_order,
    });

    return res.status(200).json({
      message: "更新 OptionValue 成功",
      data: optionValue,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "伺服器錯誤", error: error.message });
  }
}

// Delete OptionValue
async function deleteOptionValue(req, res) {
  try {
    const optionValue = await OptionValue.findByPk(req.params.id);

    if (!optionValue) {
      return res.status(404).json({ message: "找不到此 OptionValue" });
    }

    await optionValue.destroy();

    return res.status(200).json({ message: "刪除 OptionValue 成功" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "伺服器錯誤", error: error.message });
  }
}

module.exports = {
  createOptionValue,
  getAllOptionValues,
  getOptionValueById,
  updateOptionValue,
  deleteOptionValue,
};
