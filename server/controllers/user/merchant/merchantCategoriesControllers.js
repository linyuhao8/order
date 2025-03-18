const { MerchantCategory, Merchant } = require("../../../config/postgreSql").db;
const merchantCategorySchema = require("../../../validations/user/merchant/merchantCategoryValidation");


const createMerchantCategory = async (req, res) => {
  const { error } = merchantCategorySchema.create.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    const { name, merchant_id } = req.body;
    const merchant = await Merchant.findByPk(merchant_id);
    if (!merchant) {
      res.status(400).json({ message: "找不到此商家" });
    }
    const newCategory = await MerchantCategory.create({ name, merchant_id });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating merchant category:", error);
    res.status(500).json({ message: "伺服器錯誤", error: error.message });
  }
};

const getAllMerchantCategories = async (req, res) => {
  try {
    const categories = await MerchantCategory.findAll({
      include: { model: Merchant, as: "merchant" },
    });
    if (categories.length == 0) {
      res.status(400).json({ message: "找不到商家標籤" });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching merchant categories:", error);
    res.status(500).json({ message: "伺服器錯誤", error: error.message });
  }
};

const getMerchantCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await MerchantCategory.findByPk(id, {
      include: { model: Merchant, as: "merchant" },
    });

    if (!category) {
      return res.status(404).json({ message: "找不到該商家分類" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching merchant category:", error);
    res.status(500).json({ message: "伺服器錯誤", error: error.message });
  }
};

const updateMerchantCategory = async (req, res) => {
  const { error } = merchantCategorySchema.update.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await MerchantCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "找不到該商家分類" });
    }

    category.name = name || category.name;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error("Error updating merchant category:", error);
    res.status(500).json({ message: "伺服器錯誤", error: error.message });
  }
};

const deleteMerchantCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await MerchantCategory.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "找不到該商家分類" });
    }

    await category.destroy();
    res.status(200).json({ message: "商家分類已刪除" });
  } catch (error) {
    console.error("Error deleting merchant category:", error);
    res.status(500).json({ message: "伺服器錯誤", error: error.message });
  }
};

module.exports = {
  createMerchantCategory,
  getAllMerchantCategories,
  getMerchantCategoryById,
  updateMerchantCategory,
  deleteMerchantCategory,
};
