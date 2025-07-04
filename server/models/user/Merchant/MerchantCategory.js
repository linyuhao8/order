module.exports = (sequelize, DataTypes) => {
  const MerchantCategory = sequelize.define(
    "MerchantCategory",
    {
      merchant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "merchants",
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "m_categories",
          key: "id",
        },
      },
    },
    {
      tableName: "merchant_categories",
      timestamps: false, // 如果你不需要 createdAt 和 updatedAt，可以關掉
      indexes: [
        {
          unique: true,
          fields: ["merchant_id", "category_id"], // 定義組合鍵
        },
      ],
    }
  );

  MerchantCategory.associate = (models) => {
    MerchantCategory.belongsTo(models.Merchant, {
      foreignKey: "merchant_id",
      as: "merchant",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    MerchantCategory.belongsTo(models.MerchantCategoryMain, {
      foreignKey: "category_id",
      as: "m_category",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return MerchantCategory;
};
