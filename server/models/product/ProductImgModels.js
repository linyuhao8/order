module.exports = (sequelize, DataTypes) => {
  const ProductImg = sequelize.define(
    "ProductImg",
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
        onDelete: "CASCADE",
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "product_imgs",
      timestamps: true,
    }
  );

  // 關聯設定
  ProductImg.associate = (models) => {
    ProductImg.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "images",
      onDelete: "CASCADE",
    });
  };

  return ProductImg;
};
