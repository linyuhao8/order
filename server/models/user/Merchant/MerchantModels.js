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
        allowNull: false,
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
      as: "product_options", // Alias for accessing the associated ProductOptions from the Merchant model
      onDelete: "SET NULL", // Ensures that when a Merchant is deleted, all associated ProductOptions will be deleted
      onUpdate: "CASCADE",
    });
    Merchant.belongsToMany(models.MCategory, {
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
      onUpdate: "CASCADE",
    });
    Merchant.belongsTo(models.Image, {
        foreignKey: "merchant_logo_id",
        as: "merchant_logo",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
  };

  return Merchant;
};
