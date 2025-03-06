const Joi = require("joi");

const merchantSchema = Joi.object({
  user_id: Joi.string().uuid().required().messages({
    "string.empty": "user_id 不能為空",
    "string.guid": "user_id 必須是有效的 UUID",
    "any.required": "user_id 為必填欄位",
  }),
  business_name: Joi.string().max(255).required().messages({
    "string.empty": "商家名稱不能為空",
    "string.max": "商家名稱不能超過 255 個字元",
    "any.required": "商家名稱為必填欄位",
  }),
  description: Joi.string().max(1000).allow("").messages({
    "string.max": "商家描述不能超過 1000 個字元",
  }),
  feature: Joi.string().max(10).allow("").messages({
    "string.max": "特色描述最多 10 個字元",
  }),
  merchant_logo: Joi.string().uri().allow("").messages({
    "string.uri": "商家 Logo 必須是有效的 URL",
  }),
  location: Joi.string().max(500).required().messages({
    "string.empty": "地點不能為空",
    "string.max": "地點描述不能超過 500 個字元",
    "any.required": "地點為必填欄位",
  }),
});

module.exports = merchantSchema;
