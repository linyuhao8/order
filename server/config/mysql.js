require("dotenv").config();
const { Sequelize } = require("sequelize");

// 使用 Sequelize 與 MySQL 建立連線
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, // 資料庫名稱
  process.env.MYSQL_USER, // 用戶名
  process.env.MYSQL_PASSWORD, // 密碼
  {
    host: process.env.MYSQL_HOST, // 主機
    dialect: "mysql", // 資料庫類型
    port: process.env.MYSQL_PORT || 3306, // 預設端口號 3306
    logging: false, // 是否顯示 SQL 查詢
    define: {
      timestamps: true, // 設定是否使用時間戳記
      underscored: true, // 使用下劃線命名
    },
  }
);
// 測試資料庫連線
async function connectionSql() {
  try {
    await sequelize.authenticate(); // 測試資料庫連線
    console.log("✅ MySQL Connected Successfully!");
  } catch (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
  }
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 匯入模型
db.User = require("../models/user-model")(sequelize, Sequelize);

// 匯出 sequelize 實例
module.exports = { sequelize, connectionSql, db };
