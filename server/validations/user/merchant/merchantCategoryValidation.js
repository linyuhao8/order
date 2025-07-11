const Joi = require("joi");

// 創建分類的驗證規則
const createCategorySchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "分類名稱為必填",
    "string.empty": "分類名稱不能為空",
  }),
  description: Joi.string().allow("").optional(),
  image_id: Joi.string()
    .guid({ version: "uuidv4" })
    .allow(null, "")
    .optional()
    .messages({
      "string.guid": "image_id 必須是有效的 UUID",
    }),
});

// 更新分類的驗證規則
const updateCategorySchema = Joi.object({
  name: Joi.string().trim().optional(),
  description: Joi.string().allow("").optional(),
  image_id: Joi.string()
    .guid({ version: "uuidv4" })
    .allow(null, "")
    .optional()
    .messages({
      "string.guid": "image_id 必須是有效的 UUID",
    }),
});

// 新增商家到分類的驗證規則
const addCategoryToMerchantSchema = Joi.object({
  merchant_id: Joi.string().guid({ version: "uuidv4" }).required().messages({
    "any.required": "商家 ID 為必填",
    "string.guid": "user_id 必須是有效的 UUID",
  }),
  category_id: Joi.number().integer().required().messages({
    "any.required": "分類 ID 為必填",
    "number.base": "分類 ID 必須為數字",
  }),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  addCategoryToMerchantSchema,
};
