const { ProductOption } = require("../../../config/postgreSql").db; // 引入 ProductOption 模型
const {
  createProductOptionSchema,
  updateProductOptionSchema,
} = require("../../../validations/product/product_option/productOptionValidation");

// 創建 ProductOption
const createProductOption = async (req, res) => {
  const { error } = createProductOptionSchema.validate(req.body, {
    abortEarly: false, // 允許顯示所有錯誤
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    const {
      product_id,
      option_id,
      required = false,
      sort_order = null,
    } = req.body;

    const newProductOption = await ProductOption.create({
      product_id,
      option_id,
      required,
      sort_order,
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
  const { error } = updateProductOptionSchema.validate(req.body, {
    abortEarly: false, // 允許顯示所有錯誤
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    const { id } = req.params;
    const { product_id, option_id, required, sort_order } = req.body;

    const productOption = await ProductOption.findByPk(id);
    if (!productOption) {
      return res.status(404).json({ message: "ProductOption not found" });
    }

    if (product_id !== undefined) productOption.product_id = product_id;
    if (option_id !== undefined) productOption.option_id = option_id;
    if (required !== undefined) productOption.required = required;
    if (sort_order !== undefined) productOption.sort_order = sort_order;

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
