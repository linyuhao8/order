const Joi = require("joi");

// createProductOption 驗證 schema
const createProductOptionSchema = Joi.object({
  product_id: Joi.string().uuid().required(),
  option_id: Joi.string().uuid().required(),
  required: Joi.boolean().optional().default(false),
  sort_order: Joi.number().integer().optional().allow(null),
});

// updateProductOption 驗證 schema
const updateProductOptionSchema = Joi.object({
  product_id: Joi.string().uuid().optional(),
  option_id: Joi.string().uuid().optional(),
  required: Joi.boolean().optional(),
  sort_order: Joi.number().integer().optional().allow(null),
}).min(1); // 至少要有一個欄位更新

module.exports = {
  createProductOptionSchema,
  updateProductOptionSchema,
};
