const app = require("./app");
const connectMongo = require("./config/mongodb");
const { connectionSql } = require("./config/mysql");

connectionSql();
// 啟動伺服器
app.listen(8081, () => {
  console.log("Is listening on port 8081");
});
