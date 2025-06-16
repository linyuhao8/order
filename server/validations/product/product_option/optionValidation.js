const Joi = require("joi");

// Validation schema for creating Option (POST)
const createOptionSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "請填寫選項名稱",
    "string.base": "選項名稱必須是字串",
  }),

  type: Joi.string()
    .valid("select", "checkbox", "text", "number")
    .required()
    .messages({
      "any.required": "請選擇選項類型",
      "any.only": "選項類型必須是 select、checkbox、text 或 number",
    }),

  description: Joi.string().allow(null, "").optional(),

  min_select: Joi.number().integer().min(0).allow(null).optional().messages({
    "number.base": "min_select 必須是整數",
    "number.integer": "min_select 必須是整數",
  }),

  max_select: Joi.number().integer().min(0).allow(null).optional().messages({
    "number.base": "max_select 必須是整數",
    "number.integer": "max_select 必須是整數",
  }),
});

// Validation schema for updating Option (PUT)
const updateOptionSchema = Joi.object({
  name: Joi.string().optional(),

  type: Joi.string()
    .valid("select", "checkbox", "text", "number")
    .optional()
    .messages({
      "any.only": "選項類型必須是 select、checkbox、text 或 number",
    }),

  description: Joi.string().allow(null, "").optional(),

  min_select: Joi.number().integer().min(0).allow(null).optional(),

  max_select: Joi.number().integer().min(0).allow(null).optional(),
})
  .min(1)
  .messages({
    "object.min": "請至少提供一個要更新的欄位",
  });

module.exports = { createOptionSchema, updateOptionSchema };
