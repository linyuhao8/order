const Joi = require("joi");

// 用於創建新的商家 (POST)
const createMerchantValidation = Joi.object({
  user_id: Joi.string().guid({ version: "uuidv4" }).required().messages({
    "string.guid": "user_id 必須是有效的 UUID",
    "any.required": "user_id 是必填欄位",
  }),
  business_name: Joi.string().max(255).required().messages({
    "string.max": "商家名稱最多 255 字元",
    "any.required": "商家名稱是必填欄位",
  }),
  description: Joi.string().optional(),
  feature: Joi.string().max(10).optional().messages({
    "string.max": "商家特色最多 10 字元",
  }),
  location: Joi.string().allow("").optional(),
  image_id: Joi.string().guid({ version: "uuidv4" }).optional().messages({
    "string.guid": "image_id 必須是有效的 UUID",
  }),
  merchant_logo_id: Joi.string()
    .guid({ version: "uuidv4" })
    .optional()
    .messages({
      "string.guid": "merchant_logo_id 必須是有效的 UUID",
    }),
  business_hours: Joi.string().max(100).optional().messages({
    "string.max": "business_hours 最多 100 個字",
  }),
});

// 用於更新商家 (PUT)
const updateMerchantValidation = Joi.object({
  business_name: Joi.string().max(255).optional().messages({
    "string.max": "商家名稱最多 255 字元",
  }),
  description: Joi.string().optional(),
  feature: Joi.string().max(10).optional().messages({
    "string.max": "商家特色最多 10 字元",
  }),
  merchant_logo_id: Joi.string()
    .guid({ version: "uuidv4" })
    .optional()
    .messages({
      "string.guid": "merchant_logo_id 必須是有效的 UUID",
    }),
  location: Joi.string().allow("").optional(),
  image_id: Joi.string().guid({ version: "uuidv4" }).optional().messages({
    "string.guid": "image_id 必須是有效的 UUID",
  }),
  business_hours: Joi.string().max(100).optional().messages({
    "string.max": "business_hours 最多 100 個字",
  }),
});

module.exports = {
  createMerchantValidation,
  updateMerchantValidation,
};
