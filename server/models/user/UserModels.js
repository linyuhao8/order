// models/user.js
module.exports = (sequelize, DataTypes) => {
  //由於 Sequelize 預設將模型名稱 User 映射為 users 表格，你應該用 SELECT * FROM "Users"; 查詢資料。
  const User = sequelize.define(
    "User",
    {
      // 用戶基本資料
      id: {
        type: DataTypes.UUID, // 使用 UUID 作為主鍵
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("customer", "merchant", "admin"),
        allowNull: false,
        defaultValue: "customer",
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
    }
  );

  return User;
};
