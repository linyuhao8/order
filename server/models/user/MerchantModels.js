module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define(
    "Merchant",
    {
      // Merchant ID (使用 UUID 作為主鍵)
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // 使用 UUIDV4 作為預設值
        primaryKey: true,
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
      // 商家名稱
      business_name: {
        type: DataTypes.STRING(255),
        allowNull: false, // 不允許為空
      },
      // 商家描述
      description: {
        type: DataTypes.TEXT,
        allowNull: true, // 可以為空
      },
      // 商家特色 (限制為 10 字)
      feature: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      // 商家標誌 URL
      merchant_logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // 商家位置
      location: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "merchants", // 指定表名
      timestamps: true, // 自動生成 createdAt、updatedAt
    }
  );

  // 關聯設定 (可選，如果需要與 User 模型建立關聯)
  Merchant.associate = (models) => {
    Merchant.belongsTo(models.User, {
      foreignKey: "user_id", // 外鍵名稱
      as: "user", // 關聯名稱
      onDelete: "CASCADE",
    });
  };

  return Merchant;
};
