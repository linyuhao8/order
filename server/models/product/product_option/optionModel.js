module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define(
    "Option",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
      },
      type: {
        type: DataTypes.ENUM("select", "text", "number", "checkbox"),
        allowNull: false,
      },
    },
    {
      tableName: "options",
      timestamps: true,
    }
  );

  Option.associate = (models) => {
    // 設定 Option 與 Category 之間的關聯
    // Option "屬於" Category，並且有外鍵 "category_id"
    Option.belongsTo(models.Category, {
      foreignKey: "category_id", // 外鍵欄位名稱是 "category_id"
      as: "categories", // 給關聯起個別名，這裡使用 "categories"
      onDelete: "SET NULL", // 當 Category 被刪除時，Option 的 category_id 設為 NULL
    });

    // 設定 Option 與 OptionValue 之間的關聯
    // Option "有很多" OptionValue，並且有外鍵 "option_id"
    Option.hasMany(models.OptionValue, {
      foreignKey: "option_id", // 外鍵欄位名稱是 "option_id"
      as: "option_values", // 給關聯起個別名，這裡使用 "option_values"
      onDelete: "CASCADE", // 當 Option 被刪除時，對應的 OptionValue 會被刪除
    });

    // 設定 Option 與 Product 之間的多對多關聯
    // Option "屬於多個" Product，透過中介表 ProductOption 來建立關聯
    Option.belongsToMany(models.Product, {
      through: models.ProductOption, // 使用中介表 "ProductOption" 來建立關聯
      foreignKey: "option_id", // 外鍵欄位名稱是 "option_id"
      as: "product_options", // 給關聯起個別名，這裡使用 "product_options"
      onDelete: "CASCADE", // 當 Option 被刪除時，相關的 ProductOption 也會被刪除
    });
  };

  return Option;
};
