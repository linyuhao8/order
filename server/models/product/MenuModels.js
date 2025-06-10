module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      id: {
        type: DataTypes.UUID, // 使用 UUID 類型
        defaultValue: DataTypes.UUIDV4, // 自動生成 UUID
        primaryKey: true, // 設定為主鍵
      },
      name: {
        type: DataTypes.STRING, // 菜單名稱
        allowNull: false, // 不允許為空
      },
      description: {
        type: DataTypes.TEXT, // 描述欄位
        allowNull: true, // 可以為空
      },
      merchant_id: {
        type: DataTypes.UUID, // 關聯商家的 UUID
        allowNull: false, // 不允許為空
        references: {
          model: "merchants", // 關聯到 Merchants 表
          key: "id", // 外鍵指向 Merchant 表的 id 欄位
        },
      },
    },
    {
      // 可以選擇設置一些配置選項
      tableName: "menus", // 指定表格名稱
      timestamps: true, // 启用时间戳（createdAt 和 updatedAt）
    }
  );

  // 設置關聯
  Menu.associate = (models) => {
    Menu.belongsTo(models.Merchant, {
      foreignKey: "merchant_id",
      as: "merchants",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    // **Menu** 是「一方」，這裡我們告訴 Sequelize 一個 Menu 可以擁有多個 Product
    Menu.hasMany(models.Product, {
      // `foreignKey` 這個屬性定義了關聯的外鍵，即 Product 表中的欄位名稱
      foreignKey: "menu_id", // 這表示 Product 表中會有一個 `menu_id` 欄位，指向 Menu 表中的 `id` 欄位
      // `as` 用來定義這個關聯的別名，這個別名會用於查詢時來加載相關聯的資料
      // 在這裡我們設置為 "products"，之後在 include 查詢時會使用這個別名來獲取所有對應的產品
      as: "menu",
      onDelete: "CASCADE", // 刪除 Menu 時，刪除關聯的 Product
      onUpdate: "CASCADE",
    });
  };

  return Menu;
};
