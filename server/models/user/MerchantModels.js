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

  // Association setup (optional, if you need to establish a relationship with the User model)
  Merchant.associate = (models) => {
    // A Merchant belongs to one User, linked by the user_id foreign key
    // If the associated User is deleted, the related Merchant will also be deleted.
    Merchant.belongsTo(models.User, {
      foreignKey: "user_id", // Foreign key name that links to the User model
      as: "user", // Alias for accessing the associated User from the Merchant model
      onDelete: "SET NULL", // Ensures that when a User is deleted, the associated Merchant will be deleted
      onUpdate: "CASCADE",
    });
    Merchant.hasMany(models.Menu, {
      foreignKey: "merchant_id", // Foreign key in ProductOption that links to Merchant
      as: "menus", // Alias for accessing the associated ProductOptions from the Merchant model
      onDelete: "CASCADE", // Ensures that when a Merchant is deleted, all associated ProductOptions will be deleted
      onUpdate: "CASCADE",
    });
    // A Merchant can have multiple ProductOptions through the ProductOption table
    // If a Merchant is deleted, all associated ProductOptions will also be deleted.
    Merchant.hasMany(models.ProductOption, {
      foreignKey: "merchant_id", // Foreign key in ProductOption that links to Merchant
      as: "productOptions", // Alias for accessing the associated ProductOptions from the Merchant model
      onDelete: "SET NULL", // Ensures that when a Merchant is deleted, all associated ProductOptions will be deleted
      onUpdate: "CASCADE",
    });
  };

  return Merchant;
};
