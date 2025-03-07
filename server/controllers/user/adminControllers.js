const Admin = require("../../config/postgreSql").db.Admin;
const User = require("../../config/postgreSql").db.User;

// 📌 創建管理員
const createAdmin = async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({
        message: "無效的 user_id，該用戶不存在",
      });
    }
    if (user.role == "admin") {
      return res.json({ message: "您已經是管理員" });
    }
    const newAdmin = await Admin.create({
      user_id,
    });
    // 更新用戶的角色為管理員
    user.role = "admin";
    await user.save();
    res.status(201).json({ message: "管理員創建成功", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error });
  }
};

// 📌 取得所有管理員
const getAllAdmin = async (req, res) => {
  try {
    const admins = await User.findAll({ where: { role: "admin" } });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error });
  }
};

// 📌 取得單個管理員
const getAdmin = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user.role !== "admin")
      return res.status(404).json({ message: "管理員未找到" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error });
  }
};

// 📌 刪除管理員
const deleteAdmin = async (req, res) => {
  try {
    const deleted = await Admin.destroy({ where: { user_id: req.params.id } });

    if (!deleted) return res.status(404).json({ message: "管理員未找到" });
    //更改權限
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.role = "customer"; // 更改角色為 customer
      await user.save(); // 保存更新
    }
    res.status(200).json({ message: "管理員已刪除" });
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error });
  }
};

module.exports = {
  createAdmin,
  getAllAdmin,
  getAdmin,
  deleteAdmin,
};
