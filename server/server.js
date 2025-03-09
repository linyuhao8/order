const app = require("./app");
// require("./config/mongodb");
require("./config/postgreSql");

require("dotenv").config();

const port = process.env.SERVER_PORT_ENV;
// 啟動伺服器
app.listen(port, () => {
  console.log(`Is listening on port ${port}`);
});
