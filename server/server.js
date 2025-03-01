const app = require("./app");
const connectMongo = require("./config/mongodb");
const { connectionSql } = require("./config/mysql");
require("dotenv").config();

connectionSql();
const port = process.env.SERVER_ENV;
// 啟動伺服器
app.listen(port, () => {
  console.log(`Is listening on port ${port}`);
});
