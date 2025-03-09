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
//User
const userRoutes = require("./routes/user/userRoutes");
const adminRoutes = require("./routes/user/adminRoutes");
const merchantRoutes = require("./routes/user/merchantRoutes");
//Product
const menuRoutes = require("./routes/product/menuRoutes");
const productRoutes = require("./routes/product/productRoutes");
const productImageRoutes = require("./routes/product/productImgRoutes");
const categoryRoutes = require("./routes/product/category/categoryRoutes");

// 設置 JSON 解析和 URL 編碼解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

// Swagger UI 設置
app.use("/api-docs", cors(), swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 路由設定
//User
app.use("/api/user", userRoutes);
app.use("/api/merchant", authenticateToken, merchantRoutes);
app.use("/api/admin", verifyAdmin, adminRoutes);
//Product
app.use("/api/menu", authenticateToken, menuRoutes);
app.use("/api/product", authenticateToken, productRoutes);
app.use("/api/productimg", authenticateToken, productImageRoutes);
app.use("/api/category", authenticateToken, categoryRoutes);

module.exports = app;
