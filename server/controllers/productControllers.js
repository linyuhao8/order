const Product = require("../config/postgreSql").db.Product;
const Menu = require("../config/postgreSql").db.Menu;
const { Op } = require("sequelize");

// 創建產品
const createProduct = async (req, res) => {
  try {
    const { name, description, price, menu_id } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      price,
      menu_id,
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create product", error });
  }
};

// 獲取所有產品
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    if (products.length === 0) {
      return res.status(404).json({ message: "找不到產品" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch products", error });
  }
};

// 查詢所有有 menu_id 的產品
const getProductsWithMenuId = async (req, res) => {
  try {
    const { menu_id } = req.params; // 從 URL 參數獲取 menu_id

    // 查詢所有 `menu_id` 匹配的產品
    const products = await Product.findAll({
      where: { menu_id }, // 過濾 `menu_id`
      include: [
        {
          model: Menu,
          as: "menu",
          attributes: ["name"], // 只回傳 `menu.name`
        },
      ],
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "找不到此 menu_id 的產品" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("查詢失敗:", error);
    return res.status(500).json({ message: "無法獲取產品", error });
  }
};

// 根據ID獲取單個產品
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch product", error });
  }
};

// 更新產品
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, menu_id } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.menu_id = menu_id || product.menu_id;

    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update product", error });
  }
};

// 刪除產品
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete product", error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsWithMenuId,
  getProductById,
  updateProduct,
  deleteProduct,
};
