const { MerchantCategoryMain, MerchantCategory, Merchant, Image } =
  require("../../../config/postgreSql").db;
const {
  createCategorySchema,
  updateCategorySchema,
  addCategoryToMerchantSchema,
} = require("../../../validations/user/merchant/merchantCategoryValidation");

// **1️⃣ 建立類別 (可選擇性連動商家)**
const createCategory = async (req, res) => {
  const { error } = createCategorySchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((err) => err.message),
    });
  }

  try {
    const { name, description, merchant_ids, image_id } = req.body;

    if (image_id) {
      const existingImg = await Image.findOne({
        where: { id: image_id },
      });

      if (!existingImg) {
        return res.status(400).json({
          success: false,
          message: "Image with this ID does not exist",
        });
      }
    }

    // 檢查類別名稱是否已存在
    const existingCategory = await MerchantCategoryMain.findOne({
      where: { name },
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists",
      });
    }

    // 創建新的類別
    const category = await MerchantCategoryMain.create({
      name,
      description,
      image_id: image_id,
    });

    // 如果有提供 `merchant_ids`，則自動關聯商家
    if (merchant_ids && merchant_ids.length > 0) {
      const merchantCategories = merchant_ids.map((merchant_id) => ({
        merchant_id,
        category_id: category.id,
      }));
      await MerchantCategory.bulkCreate(merchantCategories);
    }

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};

// **2️⃣ 取得所有類別 (包含商家)**
const getAllCategories = async (req, res) => {
  try {
    const categories = await MerchantCategoryMain.findAll({
      include: [
        {
          model: Merchant,
          as: "merchants",
          through: { attributes: [] },
        },
        {
          model: Image,
          as: "image",
        },
      ],
    });

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// **3️⃣ 取得單個類別 (包含商家)**
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await MerchantCategoryMain.findByPk(id, {
      include: [
        { model: Merchant, as: "merchants", through: { attributes: [] } },
        {
          model: Image,
          as: "image",
        },
      ],
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// **4️⃣ 更新類別 (同步更新中間表)**
const updateCategory = async (req, res) => {
  const { error } = updateCategorySchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((err) => err.message),
    });
  }
  try {
    const { id } = req.params;
    const { name, description, image_id, merchant_ids } = req.body;

    const category = await MerchantCategoryMain.findByPk(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    // 如果提供了 img_id，確保它是有效的
    if (image_id) {
      const existingImg = await Image.findOne({
        where: { id: image_id },
      });

      if (!existingImg) {
        return res.status(400).json({
          success: false,
          message: "Image with this ID does not exist",
        });
      }
    }
    await category.update({ name, description, image_id });

    // **同步更新 MerchantCategory**
    if (merchant_ids) {
      await MerchantCategory.destroy({ where: { category_id: id } });

      if (merchant_ids.length > 0) {
        const newMerchantCategories = merchant_ids.map((merchant_id) => ({
          merchant_id,
          category_id: id,
        }));
        await MerchantCategory.bulkCreate(newMerchantCategories);
      }
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// **5️⃣ 刪除類別 (自動刪除 MerchantCategory)**
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await MerchantCategory.destroy({ where: { category_id: id } });
    const deleted = await MerchantCategoryMain.destroy({ where: { id } });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// **6️⃣ 新增類別到商家**
const addCategoryToMerchant = async (req, res) => {
  const { error } = addCategoryToMerchantSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((err) => err.message),
    });
  }
  try {
    const { merchant_id, category_id } = req.body;

    const exists = await MerchantCategory.findOne({
      where: { merchant_id, category_id },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Merchant already has this category",
      });
    }

    const merchantCategory = await MerchantCategory.create({
      merchant_id,
      category_id,
    });

    res.status(201).json({ success: true, data: merchantCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// **7️⃣ 從商家移除類別**
const removeCategoryFromMerchant = async (req, res) => {
  try {
    const { merchant_id, category_id } = req.params;

    const deleted = await MerchantCategory.destroy({
      where: { merchant_id, category_id },
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Relation not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Category removed from merchant" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 1️⃣ 查詢某商家的所有分類
const getCategoriesByMerchant = async (req, res) => {
  try {
    const { merchant_id } = req.params;

    // 查找該商家的所有分類
    const merchantCategories = await MerchantCategory.findAll({
      where: { merchant_id },
      include: [
        {
          model: MerchantCategoryMain,
          as: "m_category",
          attributes: ["id", "name", "description", "img"],
        },
      ],
    });

    if (!merchantCategories.length) {
      return res.status(404).json({
        success: false,
        message: "No categories found for this merchant.",
      });
    }

    res.status(200).json({ success: true, data: merchantCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2️⃣ 查詢某個類別下的所有商家
const getMerchantsByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;

    // 查找該類別下所有的商家
    const merchants = await MerchantCategory.findAll({
      where: { category_id },
      include: [
        {
          model: Merchant,
          as: "merchant",
          attributes: ["id", "business_name", "location", "merchant_logo"],
        },
      ],
    });

    if (!merchants.length) {
      return res.status(404).json({
        success: false,
        message: "No merchants found for this category.",
      });
    }

    res.status(200).json({ success: true, data: merchants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3️⃣ 查詢某個類別下有多少商家
const getMerchantsCountByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;

    // 查詢某個類別下的商家數量
    const count = await MerchantCategory.count({
      where: { category_id },
    });

    res
      .status(200)
      .json({ success: true, data: { category_id, merchant_count: count } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// **📌 匯出 Controller**
module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addCategoryToMerchant,
  removeCategoryFromMerchant,
  getCategoriesByMerchant,
  getMerchantsByCategory,
  getMerchantsCountByCategory,
};
