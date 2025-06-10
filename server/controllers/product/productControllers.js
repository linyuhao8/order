const Product = require("../../config/postgreSql").db.Product;
const Menu = require("../../config/postgreSql").db.Menu;
const ProductImg = require("../../config/postgreSql").db.ProductImg;
const {
  createProductSchema,
  updateProductSchema,
} = require("../../validations/product/productValidation");

// 創建產品
const createProduct = async (req, res) => {
  // Joi validation
  const { error } = createProductSchema.validate(req.body, {
    abortEarly: false,
  });
  //If error, return error message
  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    //get data from req.body
    const { name, description, price, menu_id } = req.body;
    //checl menu_id exist or not
    const menu = await Menu.findByPk(menu_id);
    if (!menu) {
      return res.status(400).json({ message: "找不到該菜單" });
    }
    //if menu exist, create new product
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
  // Joi 驗證
  const { error } = updateProductSchema.validate(req.body, {
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
    const { name, description, price, menu_id } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "找不到該產品" });
    }
    const menu = await Menu.findByPk(menu_id);
    if (!menu) {
      return res.status(400).json({ message: "找不到該菜單" });
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

// 查詢商家的所有菜單、產品及相關資料
const getMerchantDetails = async (req, res) => {
  try {
    const merchantId = req.params.merchant_id; // 從 URL 中獲取商家 ID

    // 查詢商家的所有菜單，並加載每個菜單的產品、圖片、分類、特徵
    const menus = await Menu.findAll({
      where: { merchant_id: merchantId }, // 只查詢該商家的菜單
      include: [
        {
          model: Product,
          as: "products", // 關聯的產品
          //連同img categories feature
          include: [
            {
              model: ProductImg,
              as: "images", // 產品圖片
            },
            //     {
            //       model: ProductCategory,
            //       as: "productCategories", // 產品分類
            //       attributes: ["name"], // 只返回分類名稱
            //     },
            //     {
            //       model: ProductFeature,
            //       as: "productFeatures", // 產品特徵
            //       attributes: ["feature"], // 只返回特徵
            //     },
          ],
        },
      ],
    });

    if (!menus || menus.length === 0) {
      return res.status(404).json({ message: "未找到菜單或產品資料" });
    }

    // 返回菜單及其所有相關資料
    return res.status(200).json(menus);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "伺服器錯誤" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsWithMenuId,
  getProductById,
  updateProduct,
  deleteProduct,
  getMerchantDetails,
};
