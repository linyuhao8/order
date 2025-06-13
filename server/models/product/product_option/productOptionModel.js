module.exports = (sequelize, DataTypes) => {
  const ProductOption = sequelize.define(
    "ProductOption",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      option_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "options",
          key: "id",
        },
      },
      required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      sort_order: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { tableName: "product_options", timestamps: true }
  );

  ProductOption.associate = (models) => {
    ProductOption.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "products",
      onDelete: "CASCADE",
    });

    ProductOption.belongsTo(models.Option, {
      foreignKey: "option_id",
      as: "options",
      onDelete: "CASCADE",
    });
  };

  return ProductOption;
};
