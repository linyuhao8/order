const User = require("../config/postgreSql").db.User;

// 創建用戶
const createUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    // 檢查必填欄位
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // 創建用戶
    const user = await User.create({
      name,
      email,
      password, // 注意，實際應該加密密碼
      phoneNumber,
      address,
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
  try {
    const userId = req.params.id;
    const { name, email, password, phoneNumber, address } = req.body;
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
      email: email || user.email,
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
