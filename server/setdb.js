const db = require("./config/mysql").db;
//使用node setdb.js將會根據mysql.js創建資料表
db.sequelize
  .sync({ force: true }) // 強制重新創建表
  .then(() => {
    console.log("Tables have been recreated successfully!");
  })
  .catch((err) => {
    console.error("Error recreating tables:", err);
  });
