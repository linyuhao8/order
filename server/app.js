const express = require("express");
const cors = require("cors"); // 確保引入 cors
var cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
// 啟用 CORS，允許所有來源訪問 API
app.use(
  cors({
    origin: "http://localhost:3000", // 允許的前端網址
    methods: ["GET", "POST", "PUT", "DELETE"], // 允許的 HTTP 方法
    allowedHeaders: ["Content-Type", "Authorization"], // 允許的 headers
  })
);
const {
  authenticateToken,
  verifyAdmin,
} = require("./middlewares/authMiddleware");
const adminRoutes = require("./routes/user/adminRoutes");
const userRoutes = require("./routes/user/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
const productRoutes = require("./routes/productRoutes");
const merchantRoutes = require("./routes/user/merchantRoutes");

// 設置 JSON 解析和 URL 編碼解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

// Swagger UI 設置
app.use("/api-docs", cors(), swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 路由設定
app.use("/api", userRoutes);
app.use("/api", authenticateToken, menuRoutes);
app.use("/api", authenticateToken, productRoutes);
app.use("/api/merchants", authenticateToken, merchantRoutes);
app.use("/api/admin", verifyAdmin, adminRoutes);

module.exports = app;
