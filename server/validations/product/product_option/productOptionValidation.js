const Joi = require("joi");

// 建立 ProductOption 驗證 schema
const createProductOptionSchema = Joi.object({
  product_id: Joi.string().uuid({ version: "uuidv4" }).required().messages({
    "string.guid": "產品 ID 格式錯誤 (UUID)",
    "any.required": "請提供產品 ID",
  }),
  option_id: Joi.string().uuid({ version: "uuidv4" }).required().messages({
    "string.guid": "選項 ID 格式錯誤 (UUID)",
    "any.required": "請提供選項 ID",
  }),
  required: Joi.boolean().optional().default(false),
  sort_order: Joi.number().integer().optional().allow(null),
});

// 更新 ProductOption 驗證 schema
const updateProductOptionSchema = Joi.object({
  product_id: Joi.string().uuid({ version: "uuidv4" }).messages({
    "string.guid": "產品 ID 格式錯誤 (UUID)",
  }),
  option_id: Joi.string().uuid({ version: "uuidv4" }).messages({
    "string.guid": "選項 ID 格式錯誤 (UUID)",
  }),
  required: Joi.boolean().optional(),
  sort_order: Joi.number().integer().optional().allow(null),
})
  .min(1)
  .messages({
    "object.min": "請至少提供一個要更新的欄位",
  });

module.exports = {
  createProductOptionSchema,
  updateProductOptionSchema,
};
