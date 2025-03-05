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
      menu_id: {
        type: DataTypes.UUID, // 關聯到菜單
        allowNull: true,
        references: {
          model: "menus",
          key: "id",
        },
        onDelete: "CASCADE", // 菜單刪除時，相關產品刪除
      },
    },
    {
      tableName: "products", // 指定表名
      timestamps: true, // 自動生成 createdAt、updatedAt
    }
  );

  // 關聯設定
  Product.associate = (models) => {
    // 設定 Product 與 Menu 的一對多關聯 (Product 會有一個 menu_id 指向 Menu)
    Product.belongsTo(models.Menu, {
      foreignKey: "menu_id", // 在 Product 模型中，使用 "menu_id" 作為外鍵
      as: "menu", // 在關聯中使用 "menu" 作為關聯的別名，方便在查詢時使用
    });
  };

  return Product;
};
