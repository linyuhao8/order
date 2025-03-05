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
const authenticateToken = require("./middlewares/authMiddleware");
const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
const productRoutes = require("./routes/productRoutes");
const merchantRoutes = require("./routes/merchantRoutes");

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
app.use("/api/merchants", merchantRoutes);
app.get("/", function (req, res) {
  return res.json({ Cookies: req.cookie, SignedCookies: req.signedCookies });
});
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "這是受保護的路由", user: req.user });
});
module.exports = app;
