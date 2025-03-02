const mongoose = require("mongoose");
require("dotenv").config();


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ 已連結到 MongoDB", process.env.MONGO_URI);
  })
  .catch((e) => {
    console.error("❌ 連接 MongoDB 失敗:", e);
  });

// 匯出 mongoose 物件，讓其他檔案可以使用
module.exports = mongoose;
