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
      // 移除 category_id
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
    // 移除原本的 Category 關聯
    // Option.belongsTo(models.Category, {...});

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

    // Option 和 O_category 的中間表 OptionCategory
    Option.hasMany(models.OptionCategory, {
      foreignKey: "option_id",
      as: "option_categories",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Option;
};
