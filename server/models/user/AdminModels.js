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

  // Association setup
  Admin.associate = (models) => {
    // An Admin belongs to one User, linked by the user_id foreign key
    // Each admin is associated with a specific user.
    Admin.belongsTo(models.User, {
      foreignKey: "user_id", // Foreign key name that links to the User model
      as: "user", // Alias for accessing the associated User from the Admin model
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Admin;
};
