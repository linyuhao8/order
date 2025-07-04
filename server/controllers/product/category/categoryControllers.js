const { ProductCategoryMain, Product, ProductCategory } =
  require("../../../config/postgreSql").db;
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../../../validations/product/category/categoryValidation");
const productCategorySchema = require("../../../validations/product/category/productCategoryValidation");

// 1️⃣ 創建分類
const createCategory = async (req, res) => {
  const { error } = createCategorySchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    const { name, description, img } = req.body;
    const [category, created] = await ProductCategoryMain.findOrCreate({
      where: { name }, // 查找條件
      defaults: { description, img }, // 若找不到，則用這些值創建
    });

    if (!created) {
      return res.status(400).json({ message: "已經有此類別，無法創建" });
    }
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2️⃣ 更新分類
const updateCategory = async (req, res) => {
  const { error } = updateCategorySchema.validate(req.body, {
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
    const { name, description, img } = req.body;
    const category = await ProductCategoryMain.findByPk(id);

    if (!category) return res.status(404).json({ error: "分類不存在" });

    await category.update({ name, description, img });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3️⃣ 刪除分類（⚠️ 會連帶刪除 `ProductCategory` 裡的關聯）
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ProductCategoryMain.findByPk(id);

    if (!category) return res.status(404).json({ error: "分類不存在" });

    await category.destroy();
    res.json({ message: "分類已刪除" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4️⃣ 獲取所有分類
const getAllCategories = async (req, res) => {
  try {
    const categories = await ProductCategoryMain.findAll();
    if (categories.length == 0) {
      return res.status(400).json({ message: "沒有找到分類" });
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5️⃣ 產品新增分類（新增 `ProductCategory` 關聯）
const addCategoryToProduct = async (req, res) => {
  const { error } = productCategorySchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    const { product_id, category_id } = req.body;

    // 檢查產品和分類是否存在
    const product = await Product.findByPk(product_id);
    const category = await ProductCategoryMain.findByPk(category_id);

    if (!product || !category) {
      return res.status(404).json({ error: "產品或分類不存在" });
    }

    // 建立關聯
    await ProductCategory.create({
      product_id: product_id,
      category_id: category_id,
    });

    res.json({ message: "分類已新增至產品" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6️⃣ 從產品移除分類（刪除 `ProductCategory` 關聯）
const removeCategoryFromProduct = async (req, res) => {
  try {
    const { product_id, category_id } = req.body;

    const result = await ProductCategory.destroy({
      where: { product_id: product_id, category_id: category_id },
    });

    if (result === 0) {
      return res.status(404).json({ error: "關聯不存在" });
    }

    res.json({ message: "分類已從產品移除" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 7️⃣ 獲取某個產品的所有分類
const getProductCategories = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId, {
      include: [{ model: Category, as: "categories" }],
    });

    if (!product) {
      return res.status(404).json({ error: "產品不存在" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 匯出所有方法
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  addCategoryToProduct,
  removeCategoryFromProduct,
  getProductCategories,
};
