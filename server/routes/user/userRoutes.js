const express = require("express");
const router = express.Router();

// 引入 UserController
const userController = require("../../controllers/user/userController");
const { authenticateToken } = require("../../middlewares/authMiddleware");

// 創建用戶
router.post(
  "/",
  // #swagger.tags = ['User']
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
  "/",
  // #swagger.tags = ['User']
  // #swagger.summary = 'get all users'
  authenticateToken,
  userController.getAllUsers
);

// 讀取單一用戶
router.get(
  "/:id",
  // #swagger.tags = ['User']
  // #swagger.summary = 'fing single user'
  authenticateToken,
  userController.getUserById
);

// 更新用戶
router.put(
  "/:id",
  // #swagger.tags = ['User']
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
  "/:id",
  // #swagger.tags = ['User']
  // #swagger.summary = 'delete single user'
  authenticateToken,
  userController.deleteUser
);

//login
router.post(
  "/login",
  // #swagger.tags = ['User']
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
  // #swagger.tags = ['User']
  // #swagger.summary = 'logout'
  userController.logout
);

//check cookies
router.get(
  "/checkCookies",
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get cookies token'
  userController.checkCookies
);

module.exports = router;
