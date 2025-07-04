module.exports = (sequelize, DataTypes) => {
  const OptionCategory = sequelize.define(
    "OptionCategory",
    {
      // 可以考慮移除 id，因為中介表通常用複合主鍵，但這裡保留 UUID 作為 PK 也沒問題
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      option_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "options",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      option_categories_main_id: {
        // 這邊改成對應新的資料表名稱欄位
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "option_categories_main", // 新表名
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "option_categories",
      timestamps: false,
    }
  );

  OptionCategory.associate = (models) => {
    OptionCategory.belongsTo(models.Option, {
      foreignKey: "option_id",
      as: "option",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    OptionCategory.belongsTo(models.OptionCategoryMain, {
      // 這裡改成新的 model 名稱
      foreignKey: "option_categories_main_id",
      as: "option_category_main", // 這個名稱你可以自由定義，保持語意清楚即可
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return OptionCategory;
};
