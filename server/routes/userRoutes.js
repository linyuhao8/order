const express = require("express");
const router = express.Router();

// 引入 UserController
const userController = require("../controllers/userController");

// 創建用戶
router.post(
  "/users",
  // #swagger.tags = ['Users']
  // #swagger.summary = '創建用戶'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'role可填入(customer, merchant, admin)',
            schema: {
                name: 'John Doe',
                email: "lin@gmail.com",
                password: "aaa123",
                phoneNumber: "0923213422",
                address: "台中市",
                role: "customer"
            }
    } */
  userController.createUser
);

// 讀取所有用戶
router.get(
  "/users",
  // #swagger.tags = ['Users']
  // #swagger.summary = '查詢所有用戶'
  userController.getAllUsers
);

// 讀取單一用戶
router.get(
  "/users/:id",
  // #swagger.tags = ['Users']
  // #swagger.summary = '查詢單獨用戶'
  userController.getUserById
);

// 更新用戶
router.put(
  "/users/:id",
  // #swagger.tags = ['Users']
  // #swagger.summary = '修改用戶資料'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Some description...',
            schema: {
                name: 'John Doe',
                email: "lin@gmail.com",
                password: "aaa123",
                phoneNumber: "0923213422",
                address: "台中市"
            }
    } */
  userController.updateUser
);

// 刪除用戶
router.delete(
  "/users/:id",
  // #swagger.tags = ['Users']
  // #swagger.summary = '刪除單獨用戶'
  userController.deleteUser
);

//login
router.post(
  "/login",
  // #swagger.tags = ['Users']
  // #swagger.summary = '登入'
  userController.login
);

//logout
router.post(
  "/logout",
  // #swagger.tags = ['Users']
  // #swagger.summary = '登出'
  userController.logout
);

module.exports = router;
