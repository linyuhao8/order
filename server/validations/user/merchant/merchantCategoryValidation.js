const Joi = require("joi");

const merchantCategorySchema = {
  create: Joi.object({
    name: Joi.string()
      .trim()
      .min(1)
      .max(255)
      .required()
      .empty("") // ⬅️ 這裡確保 name 不能是空字串
      .messages({
        "string.empty": "name 不能為空",
        "string.min": "商家名稱最少 1 字元",
        "string.max": "商家名稱最多 255 字元",
        "any.required": "name 是必填欄位",
      }),

    merchant_id: Joi.string()
      .guid({ version: "uuidv4" })
      .required()
      .empty("") // ⬅️ 這裡確保 merchant_id 不能是空字串
      .messages({
        "string.empty": "merchant_id 不能為空",
        "any.required": "merchant_id 是必填欄位",
        "string.guid": "merchant_id 必須是有效的 UUID",
      }),
  }),

  update: Joi.object({
    name: Joi.string().trim().min(1).max(255).optional().empty("").messages({
      "string.empty": "name 不能為空",
      "string.min": "商家名稱最少 1 字元",
      "string.max": "商家名稱最多 255 字元",
    }),

    merchant_id: Joi.string()
      .guid({ version: "uuidv4" })
      .optional()
      .empty("")
      .messages({
        "string.empty": "merchant_id 不能為空",
        "string.guid": "merchant_id 必須是有效的 UUID",
      }),
  }),
};

module.exports = merchantCategorySchema;
