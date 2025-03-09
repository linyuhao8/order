module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      // Merchant ID (使用 UUID 作為主鍵)
      id: {
        type: DataTypes.INTEGER, // 整數型 ID
        primaryKey: true,
        autoIncrement: true, // 自動增量
      },
      // 參照到 User 模型的外鍵
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "users", // 這裡的 "Users" 要與您在 DB 中的表名一致
          key: "id",
        },
        allowNull: false, // 不允許為空
      },
    },
    {
      tableName: "admins", // 指定表名
      timestamps: true, // 自動生成 createdAt、updatedAt
    }
  );

  // 關聯設定
  Admin.associate = (models) => {
    //屬於User
    Admin.belongsTo(models.User, {
      foreignKey: "user_id", // 外鍵名稱
      as: "user", // 關聯名稱
    });
  };

  return Admin;
};
