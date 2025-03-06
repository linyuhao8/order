const Joi = require("joi");

// update user info
const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).messages({
    "string.min": "姓名至少要有 2 個字",
    "string.max": "姓名最多 50 個字",
  }),
  email: Joi.string().email().messages({
    "string.email": "請輸入有效的 Email",
  }),
  password: Joi.string().min(6).max(100).messages({
    "string.empty": "密碼不可為空",
    "string.min": "密碼至少 6 個字",
    "string.max": "密碼最多 100 個字",
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
});

module.exports = updateUserSchema;
