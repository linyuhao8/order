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
      // 新增欄位
      user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "users", // 你的 User table 名稱
          key: "id",
        },
      },
      merchant_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "merchants", // 你的 Merchant table 名稱
          key: "id",
        },
      },

      is_global: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      tableName: "options",
      timestamps: true,
    }
  );

  Option.associate = (models) => {
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

    Option.hasMany(models.OptionCategory, {
      foreignKey: "option_id",
      as: "option_categories",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Option;
};
