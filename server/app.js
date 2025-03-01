const express = require("express");
const app = express();
const cors = require("cors");

// 設定中介軟體
app.use(cors());
app.use(express.json()); // JSON 請求體解析
app.use(express.urlencoded({ extended: true })); // URL 編碼的請求體解析
// 路由設定

module.exports = app;