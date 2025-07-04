require("dotenv").config();
const { Sequelize } = require("sequelize");

// 判斷環境（如果是 production，則連接 Supabase，否則使用本地 DB）
const isDevelopment = process.env.NODE_ENV === "development";
const DATABASE_URL = isDevelopment
  ? process.env.SUPABASE_DATABASE_URL // 遠端 Supabase
  : process.env.LOCAL_DATABASE_URL; // 本地 PostgreSQL

// 建立 Sequelize 連線
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false, // 關閉 SQL 日誌（可開啟進行 Debug）
});

// 測試連線
sequelize
  .authenticate()
  .then(function (_err) {
    console.log("✅ Connection has been established successfully.");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });
// sequelize
//   .authenticate()
//   .then(function () {
//     console.log("✅ Connection has been established successfully.");
//   })
//   .catch(function (e) {
//     console.log("Unable to connect to the database:", e.message);
//     console.log("Full error:", e);
//   });

// 匯入模型

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 匯入模型
// Use Related
db.User = require("../models/user/UserModels")(sequelize, Sequelize.DataTypes);
db.Merchant = require("../models/user/Merchant/MerchantModels")(
  sequelize,
  Sequelize.DataTypes
);
db.MerchantCategory = require("../models/user/Merchant/MerchantCategory")(
  sequelize,
  Sequelize.DataTypes
);
db.MCategory = require("../models/user/Merchant/MCategory")(
  sequelize,
  Sequelize.DataTypes
);
db.Admin = require("../models/user/AdminModels")(
  sequelize,
  Sequelize.DataTypes
);
//Product Related
db.Menu = require("../models/product/MenuModels")(
  sequelize,
  Sequelize.DataTypes
);
db.Product = require("../models/product/ProductModels")(
  sequelize,
  Sequelize.DataTypes
);
//Product Category
db.ProductCategoryMain =
  require("../models/product/category/ProductCategoryMainModels")(
    sequelize,
    Sequelize.DataTypes
  );
db.ProductCategory =
  require("../models/product/category/ProductCategoryModels")(
    sequelize,
    Sequelize.DataTypes
  );
//Product Option
db.ProductOption =
  require("../models/product/product_option/productOptionModel")(
    sequelize,
    Sequelize.DataTypes
  );
db.Option = require("../models/product/product_option/optionModel")(
  sequelize,
  Sequelize.DataTypes
);
db.OptionValue = require("../models/product/product_option/optionValueModel")(
  sequelize,
  Sequelize.DataTypes
);
db.O_Category = require("../models/product/product_option/category/O_Category")(
  sequelize,
  Sequelize.DataTypes
);
db.OptionCategory =
  require("../models/product/product_option/category/optionCategory")(
    sequelize,
    Sequelize.DataTypes
  );
db.Image = require("../models/image")(sequelize, Sequelize.DataTypes);

// 同步所有模型
// 使用 { force: false, alter: true }
//可以同步你的所有模型並創建缺少的資料表，也會更新現有的資料表結構而不刪除資料。
async function syncDatabase() {
  try {
    // 使用 { alter: true } 可以保證在同步時自動創建不存在的資料表，也會更新結構
    await sequelize.sync({ force: false, alter: false });
    console.log(
      "✅ Models synced with the database and missing tables created."
    );
  } catch (err) {
    console.error("❌ Error syncing models:", err.message);
  }
}

syncDatabase();

// 遍歷 db 物件中的每個模型
Object.keys(db).forEach((modelName) => {
  // 檢查該模型是否有定義 `associate` 方法
  if (db[modelName].associate) {
    // 如果有，則呼叫 `associate` 方法來建立關聯，並將整個 db 物件傳入
    db[modelName].associate(db);
  }
});

module.exports = { sequelize, db };
