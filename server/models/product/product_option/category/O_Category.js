module.exports = (sequelize, DataTypes) => {
  const O_category = sequelize.define(
    "O_Category",
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
      tableName: "o_categories",
      timestamps: true,
    }
  );

  O_category.associate = (models) => {
    O_category.belongsToMany(models.Option, {
      through: models.OptionCategory,
      foreignKey: "o_category_id",
      otherKey: "option_id",
      as: "options",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return O_category;
};
