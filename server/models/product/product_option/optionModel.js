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
        type: DataTypes.ENUM("select", "checkbox", "text", "number"),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      min_select: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      max_select: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "options",
      timestamps: true,
    }
  );

  Option.associate = (models) => {
    Option.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "categories",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    Option.hasMany(models.OptionValue, {
      foreignKey: "option_id",
      as: "option_values",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Option.belongsToMany(models.Product, {
      through: models.ProductOption,
      foreignKey: "option_id",
      as: "product_options",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Option;
};
