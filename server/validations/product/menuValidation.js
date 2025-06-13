const Joi = require("joi");

// 針對 POST 請求的驗證
const createMenuSchema = Joi.object({
  name: Joi.string().min(1).max(255).required().messages({
    "string.base": "菜單名稱必須是字符串",
    "string.empty": "菜單名稱不能為空",
    "string.min": "菜單名稱長度必須至少 1 個字符",
    "any.required": "菜單名稱是必填欄位",
  }),
  description: Joi.string()
    .allow("", null) // 允許空字串和 null
    .max(1000)
    .messages({
      "string.base": "描述必須是字符串",
      "string.max": "描述不能超過 1000 個字符",
    }),

  merchant_id: Joi.string().guid({ version: "uuidv4" }).required().messages({
    "string.empty": "商家 ID 不能為空",
    "string.base": "商家 ID 必須是字符串",
    "string.guid": "商家 ID 必須是有效的 UUID 格式",
    "any.required": "商家 ID 是必填欄位",
  }),
});

// 針對 PUT 請求的驗證
const updateMenuSchema = Joi.object({
  name: Joi.string().min(1).max(255).optional().messages({
    "string.base": "菜單名稱必須是字符串",
    "string.empty": "菜單名稱不能為空",
    "string.min": "菜單名稱長度必須至少 1 個字符",
  }),
  description: Joi.string().max(1000).allow(null).optional().messages({
    "string.empty": "描述不能為空",
    "string.base": "描述必須是字符串",
    "string.max": "描述不能超過 1000 個字符",
  }),
  merchant_id: Joi.string().guid({ version: "uuidv4" }).optional().messages({
    "string.base": "商家 ID 必須是字符串",
    "string.guid": "商家 ID 必須是有效的 UUID 格式",
  }),
});

// 輸出驗證規範
module.exports = { createMenuSchema, updateMenuSchema };
