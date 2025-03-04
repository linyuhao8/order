const express = require("express");
const cors = require("cors"); // 確保引入 cors

const app = express();

// 啟用 CORS，允許所有來源訪問 API
app.use(
  cors({
    origin: "http://localhost:3000", // 允許的前端網址
    methods: ["GET", "POST", "PUT", "DELETE"], // 允許的 HTTP 方法
    allowedHeaders: ["Content-Type", "Authorization"], // 允許的 headers
  })
);

const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
const productRoutes = require("./routes/productRoutes");

// 設置 JSON 解析和 URL 編碼解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

// Swagger UI 設置
app.use("/api-docs", cors(), swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 路由設定
app.use("/api", userRoutes);
app.use("/api", menuRoutes);
app.use("/api", productRoutes);

module.exports = app;
