const User = require("../config/postgreSql").db.User;
const { USE } = require("sequelize/lib/index-hints");
const userSchema = require("../validations/userValidation");

// 創建用戶
const allowedRoles = ["customer", "merchant"]; // 允許的角色
const createUser = async (req, res) => {
  // Joi 驗證輸入
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }

  try {
    const { name, email, password, phoneNumber, address, role } = value;

    const checkEmail = await User.findOne({ where: { email } });
    console.log(checkEmail);
    if (checkEmail) {
      return res.status(400).json({
        message: "此信箱已被使用",
      });
    }

    // 創建用戶
    const user = await User.create({
      name,
      email,
      password, // 注意，實際應該加密密碼
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
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "資料格式錯誤",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    const userId = req.params.id;
    const { name, password, phoneNumber, address } = value;
    // 檢查是否存在用戶
    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${userId} not found` });
    }

    // 更新用戶
    await user.update({
      name: name || user.name,
      password: password || user.password,
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

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
