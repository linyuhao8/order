module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define(
    "Merchant",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: true,
      },
      business_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      feature: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      merchant_logo_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "images",
          key: "id",
        },
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "images",
          key: "id",
        },
      },
      business_hours: {
        type: DataTypes.STRING,
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
      foreignKey: "user_id",
      as: "user",
      onDelete: "SET NULL", // ← 這行註解應改為 "保留商家資料，但移除對應的使用者"
    });
    Merchant.hasMany(models.Menu, {
      foreignKey: "merchant_id", // Foreign key in ProductOption that links to Merchant
      as: "menus", // Alias for accessing the associated ProductOptions from the Merchant model
      onDelete: "CASCADE", // Ensures that when a Merchant is deleted, all associated ProductOptions will be deleted
      onUpdate: "CASCADE",
    });
    Merchant.belongsToMany(models.MerchantCategoryMain, {
      through: models.MerchantCategory,
      foreignKey: "merchant_id",
      otherKey: "category_id",
      as: "categories",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Merchant.belongsTo(models.Image, {
      foreignKey: "image_id",
      as: "image",
      onDelete: "SET NULL",
    });
    Merchant.belongsTo(models.Image, {
      foreignKey: "merchant_logo_id",
      as: "merchant_logo",
      onDelete: "SET NULL",
    });
  };

  return Merchant;
};
