const User = require("../../config/postgreSql").db.User;
require("dotenv").config();
const registerUserSchema = require("../../validations/user/registerUserValidation");
const updateUserSchema = require("../../validations/user/updateUserValidation");
const loginSchema = require("../../validations/user/loginUserValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  // Joi 驗證輸入
  const { error, value } = registerUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }

  try {
    const { name, email, password, phoneNumber, address, role } = value;
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) {
      return res.status(400).json({
        message: "此信箱已被使用",
      });
    }

    // 創建用戶
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role,
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("Error creating user:", err);
    return res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

// 讀取所有用戶
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

// 讀取單一用戶
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${userId} not found` });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

// 更新用戶
const updateUser = async (req, res) => {
  // Joi 驗證輸入
  const { error, value } = updateUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    const userId = req.params.id;
    const { name, password, phoneNumber, address, email } = value;
    // 檢查是否存在用戶
    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${userId} not found` });
    }
    //檢查是否有一樣的信箱
    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail && checkEmail.id !== userId) {
      return res
        .status(400)
        .json({ message: "此信箱被使用", email: checkEmail });
    }

    // 如果有提供新密碼，則進行加密
    let hashedPassword = user.password; // 預設為原來的密碼
    console.log("befroe", hashedPassword);
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10); // 加密新的密碼
    }
    console.log("after", hashedPassword);
    // 更新用戶
    await user.update({
      email: email || user.email,
      name: name || user.name,
      password: hashedPassword,
      phoneNumber: phoneNumber || user.phoneNumber,
      address: address || user.address, // 同樣需要處理密碼加密
    });
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    console.error("Error updating user:", err);
    return res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

// 刪除用戶
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${userId} not found` });
    }

    // 刪除用戶
    await user.destroy();

    return res
      .status(200)
      .json({ message: `User with id ${userId} deleted successfully` });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

//登入
const login = async (req, res) => {
  // Joi 驗證輸入
  const { error, value } = loginSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }

  try {
    const { email, password } = req.body;
    // 查詢資料庫中是否有該 Email 的用戶
    const user = await User.findOne({ where: { email } });
    // 如果找不到用戶
    if (!user) {
      return res.status(400).json({ message: "用戶不存在" });
    }
    // 比對用戶輸入的密碼和資料庫中的加密密碼
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // 密碼不正確
    if (!isPasswordValid) {
      return res.status(400).json({ message: "密碼錯誤" });
    }
    // 密碼正確，生成 JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // 將 JWT Token 儲存到 Cookie 中，並設置 HttpOnly 和 Secure 屬性
    res.cookie("token", token, {
      httpOnly: true, // 防止 JavaScript 存取該 Cookie
      secure: process.env.NODE_ENV === "production", // 只有在生產環境下才會啟用 Secure
      maxAge: 60 * 60 * 1000, // Token 存活 1 小時
    });
    // 回傳登入成功的訊息
    return res.json({ message: "登入成功" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "伺服器錯誤" });
  }
};

// 登出路由
const logout = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "您沒有登入",
    });
  }
  // 清除存儲在 Cookie 中的 JWT Token
  res.clearCookie("token");

  // 返回登出成功訊息
  res.json({ message: "登出成功" });
};

const checkCookies = (req, res) => {
  return res.json({ Cookies: req.cookies, SignedCookies: req.signedCookies });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  logout,
  checkCookies,
};
