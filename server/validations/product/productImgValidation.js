const Joi = require("joi");

// ✅ POST（新增 ProductImg）驗證
const createProductImgSchema = Joi.object({
  product_id: Joi.string().uuid().required().messages({
    "any.required": "產品 ID 為必填",
    "string.empty": "產品 ID 不能為空",
    "string.guid": "產品 ID 格式錯誤 (UUID)",
  }),

  image_url: Joi.string().uri().required().messages({
    "any.required": "圖片 URL 為必填",
    "string.empty": "圖片 URL 不能為空",
    "string.uri": "圖片 URL 格式錯誤",
  }),

  title: Joi.string().max(255).optional().messages({
    "string.max": "標題最多 255 字",
  }),

  description: Joi.string()
    .allow("", null) // 允許空字串和 null
    .max(1000)
    .messages({
      "string.base": "描述必須是字符串",
      "string.max": "描述不能超過 1000 個字符",
    }),
});

//✅ PUT（更新 ProductImg）驗證
const updateProductImgSchema = Joi.object({
  image_url: Joi.string().uri().optional().messages({
    "string.empty": "圖片 URL 不能為空",
    "string.uri": "圖片 URL 格式錯誤",
  }),

  title: Joi.string().max(255).optional().messages({
    "string.max": "標題最多 255 字",
  }),

  description: Joi.string().optional().messages({
    "string.base": "描述必須是文字",
  }),
});

module.exports = { createProductImgSchema, updateProductImgSchema };
