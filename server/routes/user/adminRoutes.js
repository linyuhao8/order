const express = require("express");
const router = express.Router();

// 引入 UserController
const adminController = require("../../controllers/user/adminControllers");

// 創建管理員
router.post(
  "/create",
  // #swagger.tags = ['Admin']
  // #swagger.summary = 'create admin,set user role to admin(Originally for customer),enter user_id'
  // #swagger.description = 'before create you need to login by admin user'
  adminController.createAdmin
);

// 讀取所有管理員
router.get(
  "/getAll",
  // #swagger.tags = ['Admin']
  // #swagger.summary = 'get all Admin'
  adminController.getAllAdmin
);

// 讀取單一管理員
router.get(
  "/users/:id",
  // #swagger.tags = ['Admin']
  // #swagger.summary = 'get single admin data(return user date),enter user_id'
  adminController.getAdmin
);

// 刪除管理員
router.delete(
  "/users/:id",
  // #swagger.tags = ['Admin']
  // #swagger.summary = 'delete admin and set user role to customer(Originally for admin),enter user_id'
  adminController.deleteAdmin
);

module.exports = router;
