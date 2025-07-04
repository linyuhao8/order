module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define(
    "ProductCategory",
    {
      product_id: {
        type: DataTypes.UUID, // ✅ 應使用 UUID
        allowNull: false,
        primaryKey: true,
        references: {
          model: "products", // ✅ 要使用實際 table 名稱（小寫複數）
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.UUID, // ✅ 應使用 UUID
        allowNull: false,
        primaryKey: true,
        references: {
          model: "product_categories_main", // ✅ 你新命名的分類表
          key: "id",
        },
      },
    },
    {
      tableName: "product_categories", // 中介表名稱
      timestamps: false,
    }
  );

  ProductCategory.associate = (models) => {
    ProductCategory.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product", // 🔁 建議使用單數語意
      onDelete: "CASCADE",
    });

    ProductCategory.belongsTo(models.ProductCategoryMain, {
      foreignKey: "category_id",
      as: "category", // 🔁 建議使用單數語意
      onDelete: "CASCADE",
    });
  };

  return ProductCategory;
};
