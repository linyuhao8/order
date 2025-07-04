module.exports = (sequelize, DataTypes) => {
  const ProductCategoryMain = sequelize.define(
    "ProductCategoryMain",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
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
    },
    {
      tableName: "product_categories_main", // 對應你資料庫表名
      timestamps: true,
    }
  );

  ProductCategoryMain.associate = (models) => {
    ProductCategoryMain.belongsToMany(models.Product, {
      through: models.ProductCategory,
      foreignKey: "category_id",
      otherKey: "product_id",
      as: "products",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    ProductCategoryMain.hasMany(models.Option, {
      foreignKey: "category_id",
      as: "options",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    ProductCategoryMain.belongsTo(models.Image, {
      foreignKey: "image_id",
      as: "image",
    });
  };

  return ProductCategoryMain;
};
