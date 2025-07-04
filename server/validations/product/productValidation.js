const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().max(255).required().messages({
    "string.empty": "name不能為空",
    "any.required": "產品名稱是必填欄位",
    "string.max": "產品名稱長度不能超過 255 字符",
  }),

  description: Joi.string().allow("", null).max(1000).messages({
    "string.base": "描述必須是字符串",
    "string.max": "描述不能超過 1000 個字符",
  }),

  price: Joi.number().min(0).required().messages({
    "string.empty": "價格不能為空",
    "any.required": "價格是必填欄位",
    "number.base": "價格必須是數字",
    "number.min": "價格不能為負數",
  }),

  cost_price: Joi.number().min(0).optional().messages({
    "number.base": "成本價格必須是數字",
    "number.min": "成本價格不能為負數",
  }),

  is_active: Joi.boolean().optional().messages({
    "boolean.base": "is_active 必須是布林值",
  }),

  menu_id: Joi.string().uuid().required().messages({
    "string.empty": "menu_id不能為空",
    "string.uuid": "菜單 ID 必須是有效的 UUID 格式",
    "string.base": "菜單 ID 必須是字符串",
  }),
});

const updateProductSchema = Joi.object({
  name: Joi.string().max(255).optional().messages({
    "string.empty": "name不能為空",
    "string.max": "產品名稱長度不能超過 255 字符",
  }),

  description: Joi.string().allow("", null).optional().messages({
    "string.base": "描述必須是字符串",
  }),

  price: Joi.number().min(0).optional().messages({
    "number.base": "價格必須是數字",
    "number.min": "價格不能為負數",
  }),

  cost_price: Joi.number().min(0).optional().messages({
    "number.base": "成本價格必須是數字",
    "number.min": "成本價格不能為負數",
  }),

  is_active: Joi.boolean().optional().messages({
    "boolean.base": "is_active 必須是布林值",
  }),

  menu_id: Joi.string().uuid().optional().messages({
    "string.empty": "menu_id不能為空",
    "string.uuid": "菜單 ID 必須是有效的 UUID 格式",
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
