module.exports = (sequelize, DataTypes) => {
  const OptionCategoryMain = sequelize.define(
    "OptionCategoryMain",
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
    },
    {
      tableName: "option_categories_main",
      timestamps: true,
    }
  );

  OptionCategoryMain.associate = (models) => {
    OptionCategoryMain.belongsToMany(models.Option, {
      through: models.OptionCategory,
      foreignKey: "option_categories_main_id",
      otherKey: "option_id",
      as: "options",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return OptionCategoryMain;
};
