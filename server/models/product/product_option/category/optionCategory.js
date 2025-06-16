module.exports = (sequelize, DataTypes) => {
  const OptionCategory = sequelize.define(
    "OptionCategory",
    {
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
      o_category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "o_categories",
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
    // OptionCategory 是 Option 與 O_category 的中間表

    OptionCategory.belongsTo(models.Option, {
      foreignKey: "option_id",
      as: "Option",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    OptionCategory.belongsTo(models.O_Category, {
      foreignKey: "o_category_id",
      as: "O_category",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return OptionCategory;
};
