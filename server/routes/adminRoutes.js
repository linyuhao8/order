const express = require("express");
const router = express.Router();

// 引入 UserController
const adminController = require("../controllers/adminControllers");

// 創建管理員
router.post(
  "/create",
  // #swagger.tags = ['Admin']
  // #swagger.summary = '創建管理員，輸入user_id'

  adminController.createAdmin
);

// 讀取所有管理員
router.get(
  "/getAll",
  // #swagger.tags = ['Admin']
  // #swagger.summary = '查詢所有管理員'
  adminController.getAllAdmin
);

// 讀取單一管理員
router.get(
  "/users/:id",
  // #swagger.tags = ['Admin']
  // #swagger.summary = '查詢單獨管理員，輸入user_id'
  adminController.getAdmin
);

// 刪除管理員
router.delete(
  "/users/:id",
  // #swagger.tags = ['Admin']
  // #swagger.summary = '刪除單獨管理員，輸入user_id'
  adminController.deleteAdmin
);

module.exports = router;
