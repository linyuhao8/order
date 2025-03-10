module.exports = (sequelize, DataTypes) => {
  const ProductOption = sequelize.define(
    "ProductOption",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      option_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "options",
          key: "id",
        },
      },
      is_custom: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      merchant_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "merchants",
          key: "id",
        },
      },
    },
    { tableName: "product_options", timestamps: true }
  );

  ProductOption.associate = (models) => {
    // 設定 ProductOption 與 Product 之間的關聯
    // ProductOption "屬於" Product，並且有外鍵 "product_id"
    ProductOption.belongsTo(models.Product, {
      foreignKey: "product_id", // 外鍵欄位名稱是 "product_id"
      as: "products", // 給關聯起個別名，這裡使用 "products"
      onDelete: "CASCADE", // 當 Product 被刪除時，對應的 ProductOption 也會被刪除
    });

    // 設定 ProductOption 與 Option 之間的關聯
    // ProductOption "屬於" Option，並且有外鍵 "option_id"
    ProductOption.belongsTo(models.Option, {
      foreignKey: "option_id", // 外鍵欄位名稱是 "option_id"
      as: "options", // 給關聯起個別名，這裡使用 "options"
      onDelete: "CASCADE", // 當 Option 被刪除時，對應的 ProductOption 也會被刪除
    });

    // 設定 ProductOption 與 Merchant 之間的關聯
    // ProductOption "屬於" Merchant，並且有外鍵 "merchant_id"
    ProductOption.belongsTo(models.Merchant, {
      foreignKey: "merchant_id", // 外鍵欄位名稱是 "merchant_id"
      as: "merchants", // 給關聯起個別名，這裡使用 "merchants"
      onDelete: "SET NULL", // 當 Merchant 被刪除時，對應的 ProductOption 也會被刪除
      onUpdate: "CASCADE",
    });
  };

  return ProductOption;
};
