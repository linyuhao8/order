const ProductImg = require("../../config/postgreSql").db.ProductImg;
const Product = require("../../config/postgreSql").db.Product;
const { where } = require("sequelize");
const {
  createProductImgSchema,
  updateProductImgSchema,
} = require("../../validations/product/productImgValidation");

// 📌 創建 ProductImg
const createProductImg = async (req, res) => {
  // Joi 驗證輸入

  const { error } = createProductImgSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }

  try {
    const { product_id, image_url, title, description } = req.body;

    // 檢查 product 是否存在
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(400).json({ message: "產品不存在" });
    }

    const newProductImg = await ProductImg.create({
      product_id,
      image_url,
      title,
      description,
    });

    res
      .status(201)
      .json({ message: "產品圖片創建成功", productImg: newProductImg });
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error });
  }
};

// 📌 取得所有 ProductImg
const getAllProductImgs = async (req, res) => {
  try {
    const productImgs = await ProductImg.findAll();
    if (productImgs.length == 0) {
      return res.status(400).json({ message: "找不到圖片" });
    }
    res.status(200).json(productImgs);
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error });
  }
};

// 📌 取得單個 ProductImg
const getProductImgById = async (req, res) => {
  try {
    const { id } = req.params;
    const productImg = await ProductImg.findByPk(id);

    if (!productImg) return res.status(404).json({ message: "產品圖片未找到" });

    res.status(200).json(productImg);
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error });
  }
};

// 📌 更新 ProductImg
const updateProductImg = async (req, res) => {
  // Joi 驗證輸入
  const { error } = updateProductImgSchema.validate(req.body, {
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
    const { image_url, title, description } = req.body;
    const productImg = await ProductImg.findByPk(id);

    if (productImg.length == 0)
      return res.status(404).json({ message: "產品圖片未找到" });

    await productImg.update({
      image_url: image_url || productImg.image_url,
      title: title || productImg.title,
      description: description || productImg.description,
    });

    res.status(200).json({ message: "產品圖片更新成功", productImg });
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error });
  }
};

// 取得某一個產品的所有圖片
const getAllImgByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const imgs = await ProductImg.findAll({
      where: { product_id: id },
    });
    if (imgs.length == 0) {
      return res.json({ message: "這個產品還沒有圖片" });
    }
    return res.json({ message: "找到圖片", imgs: imgs });
  } catch (error) {
    return res.status(500).json({ message: "伺服器錯誤", error });
  }
};

// 📌 刪除 ProductImg
const deleteProductImg = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ProductImg.destroy({ where: { id: id } });

    if (!deleted) return res.status(404).json({ message: "產品圖片未找到" });

    res.status(200).json({ message: "產品圖片已刪除" });
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error });
  }
};

module.exports = {
  createProductImg,
  getAllProductImgs,
  getProductImgById,
  updateProductImg,
  deleteProductImg,
  getAllImgByProductId,
};
