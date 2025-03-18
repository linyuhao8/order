const Joi = require("joi");

//登入的驗證器
const loginSchema = Joi.object({
  email: Joi.string().email().required().empty("").messages({
    "string.empty": "merchant_id 不能為空",
    "string.email": "請輸入有效的 Email",
    "any.required": "Email 為必填項目",
  }),
  password: Joi.string().min(6).max(100).empty("").required().messages({
    "string.empty": "密碼不可為空",
    "string.min": "密碼至少 6 個字",
    "string.max": "密碼最多 100 個字",
    "any.required": "密碼為必填項目",
  }),
});

module.exports = loginSchema;
