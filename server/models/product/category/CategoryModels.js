module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.UUID, // 使用 UUID 作為主鍵
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // 確保類別名稱唯一
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING, // 圖片 URL
        allowNull: true,
      },
    },
    {
      tableName: "p_categories",
      timestamps: true,
    }
  );
  Category.associate = (models) => {
    // 建立 Category 和 Product 之間的多對多關係
    Category.belongsToMany(models.Product, {
      through: models.ProductCategory, // 使用 ProductCategory 作為中間表
      foreignKey: "category_id", // 在 ProductCategory 表中，這個 Category 的關聯鍵
      otherKey: "product_id", // 對應 Product 的關聯鍵
      as: "products", // 在關聯查詢時，這個關係將被命名為 "products"
      onDelete: "CASCADE", // 當 Category 被刪除時，相關的 ProductCategory 資料也會被刪除
      onUpdate: "CASCADE",
    });
    //一個標籤可以被多個option綁定
    Category.hasMany(models.Option, {
      //category will point here
      foreignKey: "category_id",
      as: "options",
      onDelete: "SET NULL", // 當 Category 被刪除時，Option 的 category_id 設為 NULL
      onUpdate: "CASCADE",
    });
  };

  return Category;
};
