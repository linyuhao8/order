const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware: Authenticate JWT Token to verify login status.
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "請先登入" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token 無效或過期" });
    }
    req.user = user; // Decoded user data
    next();
  });
};
// Middleware authenticates the JWT Token and checks if it is Admin.
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

    req.user = decoded; // Save the parsed user information to req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token 無效或已過期" });
  }
};

module.exports = { authenticateToken, verifyAdmin };
