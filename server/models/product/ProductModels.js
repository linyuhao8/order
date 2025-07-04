module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID, // 使用 UUID 作為主鍵
        defaultValue: DataTypes.UUIDV4, // 自動生成 UUID
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, // 名稱必填
      },
      description: {
        type: DataTypes.TEXT, // 長文字內容
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2), // 價格，保留兩位小數
        allowNull: false,
        validate: {
          min: 0, // 價格不能為負數
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      cost_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      menu_id: {
        type: DataTypes.UUID, // 關聯到菜單
        allowNull: true,
        references: {
          model: "menus",
          key: "id",
        },
      },
    },
    {
      tableName: "products", // 指定表名
      timestamps: true, // 自動生成 createdAt、updatedAt
    }
  );

  // 關聯設定
  Product.associate = (models) => {
    Product.belongsTo(models.Menu, {
      foreignKey: "menu_id",
      as: "menu",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Product.belongsToMany(models.ProductCategoryMain, {
      through: models.ProductCategory,
      foreignKey: "product_id",
      otherKey: "category_id",
      as: "categories",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Product.belongsToMany(models.Option, {
      through: models.ProductOption,
      foreignKey: "product_id",
      otherKey: "option_id",
      as: "options",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Product;
};
