const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware: 驗證 JWT Token驗證是否登入
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "請先登入" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token 無效或過期" });
    }
    req.user = user; // 解碼後的 user 資料
    next();
  });
};
// Middleware 驗證 JWT Token 並檢查是否為 Admin
const verifyAdmin = (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "未授權，請提供 Token，此為admin驗證" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "權限不足，僅限 Admin 存取" });
    }

    req.user = decoded; // 將解析後的用戶信息存到 req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token 無效或已過期" });
  }
};

module.exports = { authenticateToken, verifyAdmin };
