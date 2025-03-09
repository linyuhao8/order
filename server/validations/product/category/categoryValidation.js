const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.base": "名稱必須是文字",
    "string.empty": "名稱不能為空",
    "string.min": "名稱至少需要 2 個字",
    "string.max": "名稱不能超過 100 個字",
    "any.required": "名稱是必填項",
  }),
  description: Joi.string().max(500).allow(null, "").messages({
    "string.max": "描述不能超過 500 個字",
  }),
  img: Joi.string().uri().allow(null, "").messages({
    "string.uri": "圖片網址格式錯誤",
  }),
});
const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).messages({
    "string.base": "名稱必須是文字",
    "string.empty": "名稱不能為空",
    "string.min": "名稱至少需要 2 個字",
    "string.max": "名稱不能超過 100 個字",
  }),
  description: Joi.string().max(500).allow(null, "").messages({
    "string.max": "描述不能超過 500 個字",
  }),
  img: Joi.string().uri().allow(null, "").messages({
    "string.uri": "圖片網址格式錯誤",
  }),
});

module.exports = { createCategorySchema, updateCategorySchema };
