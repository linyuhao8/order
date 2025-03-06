const express = require("express");
const router = express.Router();

// 引入 UserController
const userController = require("../../controllers/user/userController");
const { authenticateToken } = require("../../middlewares/authMiddleware");

// 創建用戶
router.post(
  "/users",
  // #swagger.tags = ['Users']
  // #swagger.summary = 'create user'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'role Can be filled in(customer, merchant, admin)',
            schema: {
                name: 'John Doe',
                email: "lin@gmail.com",
                password: "aaa123",
                phoneNumber: "0923213422",
                address: "台中市",
                role: "customer"
            }
    } */
  authenticateToken,
  userController.createUser
);

// 讀取所有用戶
router.get(
  "/users",
  // #swagger.tags = ['Users']
  // #swagger.summary = 'get all users'
  authenticateToken,
  userController.getAllUsers
);

// 讀取單一用戶
router.get(
  "/users/:id",
  // #swagger.tags = ['Users']
  // #swagger.summary = 'fing single user'
  authenticateToken,
  userController.getUserById
);

// 更新用戶
router.put(
  "/users/:id",
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Modify User Information'
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
  authenticateToken,
  userController.updateUser
);

// 刪除用戶
router.delete(
  "/users/:id",
  // #swagger.tags = ['Users']
  // #swagger.summary = 'delete single user'
  authenticateToken,
  userController.deleteUser
);

//login
router.post(
  "/login",
  // #swagger.tags = ['Users']
  // #swagger.summary = 'login'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Some description...',
            schema: {
                email: "lin@gmail.com",
                password: "aaa123",
            }
    } */
  userController.login
);

//logout
router.post(
  "/logout",
  // #swagger.tags = ['Users']
  // #swagger.summary = 'logout'
  userController.logout
);

//check cookies
router.get(
  "/checkCookies",
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get cookies token'
  userController.checkCookies
);

module.exports = router;
