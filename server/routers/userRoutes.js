const express = require("express");
const router = express.Router();

// 引入 UserController
const userController = require("../controllers/user-controller");

// 路由設置
router.post("/users", userController.createUser); // 創建用戶
router.get("/users", userController.getAllUsers); // 讀取所有用戶
router.get("/users/:id", userController.getUserById); // 讀取單一用戶
router.put("/users/:id", userController.updateUser); // 更新用戶
router.delete("/users/:id", userController.deleteUser); // 刪除用戶

module.exports = router;
