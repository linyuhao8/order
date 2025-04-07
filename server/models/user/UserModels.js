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
  // A User can only have one Merchant
  User.associate = (models) => {
    // A User can have many Merchants, but each Merchant is associated with only one User.
    // If the User is deleted, all associated Merchants will also be deleted.
    User.hasMany(models.Merchant, {
      foreignKey: "user_id",
      as: "merchants", // Alias for accessing the associated Merchants from the User model
      onDelete: "SET NULL", // Ensures that when a User is deleted, all associated Merchants will be deleted
      onUpdate: "CASCADE",
    });

    // A User can have one Admin, and each Admin is associated with only one User.
    // If the User is deleted, the associated Admin will also be deleted.
    User.hasOne(models.Admin, {
      foreignKey: "user_id",
      as: "admin", // Alias for accessing the associated Admin from the User model
      onDelete: "CASCADE", // Ensures that when a User is deleted, the associated Admin will be deleted
      onUpdate: "CASCADE",
    });
    User.hasMany(models.Image, {
      foreignKey: "user_id",
      as: "images",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return User;
};
