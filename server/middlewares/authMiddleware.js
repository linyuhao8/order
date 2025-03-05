const jwt = require("jsonwebtoken");
require("dotenv").config();
// Middleware: 驗證 JWT Token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "請先登入，才能查看此頁面" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token 無效或過期" });
    }
    req.user = user; // 解碼後的 user 資料
    next();
  });
};

module.exports = authenticateToken;
