const express = require("express");
const cors = require("cors"); // 確保引入 cors
var cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
// 啟用 CORS，允許所有來源訪問 API
app.use(
  cors({
    origin: "http://localhost:3000", // 允許的前端網址
    credentials: true, // 允許攜帶 cookies
  })
);
const {
  authenticateToken,
  verifyAdmin,
} = require("./middlewares/authMiddleware");
//User
const userRoutes = require("./routes/user/userRoutes");
const adminRoutes = require("./routes/user/adminRoutes");
const merchantRoutes = require("./routes/user/merchant/merchantRoutes");
const merchantCategoryRoutes = require("./routes/user/merchant/merchantCategoryRoutes");
//Product
const menuRoutes = require("./routes/product/menuRoutes");
const productRoutes = require("./routes/product/productRoutes");
const productImageRoutes = require("./routes/product/productImgRoutes");
//Product Category
const categoryRoutes = require("./routes/product/category/categoryRoutes");
//Product Option
const ProductOptionRoutes = require("./routes/product/product_option/productOptionRoutes");
const optionRoutes = require("./routes/product/product_option/optionRoutes");
const optionValueRoutes = require("./routes/product/product_option/optionValueRoutes");
const optionCategoryRoutes = require("./routes/product/product_option/category/optonCategoryRoutes");
const oCategoryRoutes = require("./routes/product/product_option/category/O_Category");
//Image
const imageRoutes = require("./routes/imageRoutes");

// 設置 JSON 解析和 URL 編碼解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

// Swagger UI 設置
app.use("/api-docs", cors(), swaggerUi.serve, swaggerUi.setup(swaggerFile));
// 路由設定

// 確認登入狀態的 API
app.get("/api/check-auth", authenticateToken, (req, res) => {
  res.json({ message: "已登入", user: req.user });
});
//User
app.use("/api/users", userRoutes);
app.use("/api/merchants", authenticateToken, merchantRoutes);
app.use("/api/merchant-categorys", authenticateToken, merchantCategoryRoutes);
app.use("/api/admins", verifyAdmin, adminRoutes);
//Product
app.use("/api/menus", authenticateToken, menuRoutes);
app.use("/api/products", authenticateToken, productRoutes);
app.use("/api/productimgs", authenticateToken, productImageRoutes);
//Porudct Category
app.use("/api/categorys", authenticateToken, categoryRoutes);
//Product Option
app.use("/api/productoptions", authenticateToken, ProductOptionRoutes);
app.use("/api/options", authenticateToken, optionRoutes);
app.use("/api/optionvalues", authenticateToken, optionValueRoutes);
app.use("/api/option-category", authenticateToken, optionCategoryRoutes);
app.use("/api/o-category", authenticateToken, oCategoryRoutes);
//Img upload
app.use("/api/images", authenticateToken, imageRoutes);

module.exports = app;
