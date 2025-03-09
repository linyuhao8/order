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
      onDelete: "CASCADE",
    });
    // Product 與 ProductImg 建立 一對多 關聯 (一個 Product 可能有多張圖片)
    Product.hasMany(models.ProductImg, {
      foreignKey: "product_id", // 外鍵對應到 ProductImg 表中的 product_id
      as: "images", // 在關聯查詢時，這個關係將被命名為 "images"
      onDelete: "CASCADE", // 當 Product 被刪除時，相關的 ProductImg 也會被刪除
    });

    // Product 與 Category 建立 多對多 關聯 (一個 Product 可能屬於多個 Category)
    Product.belongsToMany(models.Category, {
      through: models.ProductCategory, // 透過中間表 ProductCategory 建立多對多關係
      foreignKey: "product_id", // 這裡的外鍵指向 Product 表
      otherKey: "category_id", // 對應的另一個外鍵指向 Category 表
      as: "categories", // 在關聯查詢時，這個關係將被命名為 "categories"
      onDelete: "CASCADE", // 當 Product 被刪除時，相關的 ProductCategory 記錄也會被刪除
    });

    // Product和Option的多對多關聯
    Product.belongsToMany(models.Option, {
      //透過ProductOption中間表
      through: models.ProductOption,
      //中間表有一個product_id指向這邊
      foreignKey: "product_id",
      as: "options",
      onDelete: "CASCADE", // 當 Product 被刪除時，所有關聯的 ProductOption 會被刪除
    });
  };

  return Product;
};
