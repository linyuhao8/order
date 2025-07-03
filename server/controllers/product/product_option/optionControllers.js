const { Category, Option, OptionValue } =
  require("../../../config/postgreSql").db;

const {
  createOptionSchema,
  updateOptionSchema,
} = require("../../../validations/product/product_option/optionValidation");

// Create a new Option
// old disable
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
    const {
      name,
      type,
      description,
      min_select,
      max_select,
      user_id,
      merchant_id,
      is_global,
    } = req.body;

    const option = await Option.create({
      name,
      type,
      description,
      min_select,
      max_select,
      user_id,
      merchant_id,
      is_global,
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
    const { user_id, merchant_id } = req.query;

    const where = {};
    if (user_id) where.user_id = user_id;
    if (merchant_id) where.merchant_id = merchant_id;

    const options = await Option.findAll({
      where,
      include: [
        {
          model: OptionValue,
          as: "option_values",
        },
      ],
    });

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

    const {
      name,
      type,
      description,
      min_select,
      max_select,
      user_id,
      merchant_id,
      is_global,
    } = req.body;

    await option.update({
      name,
      type,
      description,
      min_select,
      max_select,
      user_id,
      merchant_id,
      is_global,
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

async function createOptionWithValues(req, res) {
  try {
    const {
      name,
      description,
      type,
      min_select,
      max_select,
      user_id,
      merchant_id,
      is_global,
      values,
    } = req.body;

    if (!name || !type || !Array.isArray(values)) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // 建立 Option
    const option = await Option.create({
      name,
      description,
      type,
      min_select,
      max_select,
      user_id,
      merchant_id,
      is_global,
    });

    // 確保 values 裡有對應欄位名稱，比如是 value
    const optionValuesData = values.map((val) => ({
      option_id: option.id,
      value: val.value, // 確認欄位名稱對應
      extra_price: val.extra_price ?? 0,
      is_default: val.is_default ?? false,
      sort_order: val.sort_order ?? 1,
    }));

    const createdValues = await OptionValue.bulkCreate(optionValuesData);

    return res.status(201).json({
      message: "Option created successfully.",
      option,
      optionValues: createdValues,
    });
  } catch (err) {
    console.error("Error creating option:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  createOption,
  getAllOptions,
  getOptionById,
  updateOption,
  deleteOption,
  createOptionWithValues,
};
