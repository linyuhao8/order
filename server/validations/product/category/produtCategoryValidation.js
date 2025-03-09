const Joi = require("joi");

const productCategorySchema = Joi.object({
  product_id: Joi.string().guid({ version: "uuidv4" }).required().messages({
    "string.guid": "產品 ID 必須是有效的 UUID",
    "any.required": "產品 ID 是必填項",
  }),
  category_id: Joi.string().guid({ version: "uuidv4" }).required().messages({
    "string.guid": "分類 ID 必須是有效的 UUID",
    "any.required": "分類 ID 是必填項",
  }),
});

module.exports = productCategorySchema;
