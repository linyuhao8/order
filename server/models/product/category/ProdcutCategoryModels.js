module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define(
    "ProductCategory",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
    },
    {
      tableName: "product_categories",
      timestamps: false,
      primaryKey: ["product_id", "category_id"], // 設定複合主鍵
    }
  );
  ProductCategory.associate = (models) => {
    // ProductCategory 與 Product 建立關聯
    ProductCategory.belongsTo(models.Product, {
      foreignKey: "product_id", // 指定關聯的外鍵，對應到 Product 表的 id
      as: "products", // 在關聯查詢時，這個關係將被命名為 "product"
      onDelete: "CASCADE", // 當 Product 被刪除時，相關的 ProductCategory 記錄也會被刪除
    });

    // ProductCategory 與 Category 建立關聯
    ProductCategory.belongsTo(models.Category, {
      foreignKey: "category_id", // 指定關聯的外鍵，對應到 Category 表的 id
      as: "categories", // 在關聯查詢時，這個關係將被命名為 "category"
      onDelete: "CASCADE", // 當 Category 被刪除時，相關的 ProductCategory 記錄也會被刪除
    });
  };

  return ProductCategory;
};
