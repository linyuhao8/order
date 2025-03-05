const Joi = require("joi");

// 用戶註冊/更新資料的 Joi 驗證
const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "姓名不可為空",
    "string.min": "姓名至少要有 2 個字",
    "string.max": "姓名最多 50 個字",
    "any.required": "姓名為必填項目",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "請輸入有效的 Email",
    "any.required": "Email 為必填項目",
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.empty": "密碼不可為空",
    "string.min": "密碼至少 6 個字",
    "string.max": "密碼最多 100 個字",
    "any.required": "密碼為必填項目",
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .allow(null, "")
    .messages({
      "string.pattern.base": "電話號碼格式錯誤，應為 10-15 位數字",
    }),
  address: Joi.string().max(255).allow(null, "").messages({
    "string.max": "地址最多 255 個字",
  }),
  role: Joi.string()
    .valid("customer", "merchant") // 不能選擇 "admin"
    .default("customer")
    .messages({
      "any.only": "註冊時只能選擇 customer 或 merchant",
    }),
});

module.exports = userSchema;
