const Joi = require('joi');

// 用於創建新的商家 (POST)
const createMerchantValidation = Joi.object({
  user_id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.guid': 'user_id 必須是有效的 UUID',
    'any.required': 'user_id 是必填欄位',
  }),
  business_name: Joi.string().max(255).required().messages({
    'string.max': '商家名稱最多 255 字元',
    'any.required': '商家名稱是必填欄位',
  }),
  description: Joi.string().optional(),
  feature: Joi.string().max(10).optional().messages({
    'string.max': '商家特色最多 10 字元',
  }),
  merchant_logo: Joi.string().uri().optional().messages({
    'string.uri': '商家標誌應該是有效的 URL',
  }),
  location: Joi.string().optional(),
  image_id: Joi.string().guid({ version: "uuidv4" }).optional().messages({
      "string.guid": "image_id 必須是有效的 UUID",
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
  merchant_logo: Joi.string().uri().optional().messages({
    "string.uri": "商家標誌應該是有效的 URL",
  }),
  location: Joi.string().optional(),
  image_id: Joi.string().guid({ version: "uuidv4" }).optional().messages({
    "string.guid": "image_id 必須是有效的 UUID",
  }),
});

module.exports = {
  createMerchantValidation,
  updateMerchantValidation,
};
