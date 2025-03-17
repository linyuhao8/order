//productOptionController.js
const { ProductOption } = require("../../../config/postgreSql").db; // 引入 ProductOption 模型

// 創建 ProductOption
const createProductOption = async (req, res) => {
  try {
    const { product_id, option_id, is_custom, merchant_id } = req.body;
    const newProductOption = await ProductOption.create({
      product_id,
      option_id,
      is_custom,
      merchant_id,
    });
    res.status(201).json({
      message: "ProductOption created successfully",
      data: newProductOption,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating ProductOption",
      error: error.message,
    });
  }
};

// 查詢所有 ProductOptions
const getAllProductOptions = async (req, res) => {
  try {
    const productOptions = await ProductOption.findAll();
    res.status(200).json({
      message: "ProductOptions fetched successfully",
      data: productOptions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching ProductOptions",
      error: error.message,
    });
  }
};

// 查詢單一 ProductOption
const getProductOptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const productOption = await ProductOption.findByPk(id);
    if (!productOption) {
      return res.status(404).json({ message: "ProductOption not found" });
    }
    res.status(200).json({
      message: "ProductOption fetched successfully",
      data: productOption,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching ProductOption",
      error: error.message,
    });
  }
};

// 更新 ProductOption
const updateProductOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, option_id, is_custom, merchant_id } = req.body;
    const productOption = await ProductOption.findByPk(id);
    if (!productOption) {
      return res.status(404).json({ message: "ProductOption not found" });
    }
    productOption.product_id = product_id || productOption.product_id;
    productOption.option_id = option_id || productOption.option_id;
    productOption.is_custom =
      is_custom !== undefined ? is_custom : productOption.is_custom;
    productOption.merchant_id = merchant_id || productOption.merchant_id;

    await productOption.save();

    res.status(200).json({
      message: "ProductOption updated successfully",
      data: productOption,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating ProductOption",
      error: error.message,
    });
  }
};

// 刪除 ProductOption
const deleteProductOption = async (req, res) => {
  try {
    const { id } = req.params;
    const productOption = await ProductOption.findByPk(id);
    if (!productOption) {
      return res.status(404).json({ message: "ProductOption not found" });
    }
    await productOption.destroy();
    res.status(200).json({
      message: "ProductOption deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting ProductOption",
      error: error.message,
    });
  }
};

module.exports = {
  createProductOption,
  getAllProductOptions,
  getProductOptionById,
  updateProductOption,
  deleteProductOption,
};
