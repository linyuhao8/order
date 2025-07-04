module.exports = (sequelize, DataTypes) => {
  const MerchantCategoryMain = sequelize.define(
    "MerchantCategoryMain",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
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
      image_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "images",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "merchant_categories_main",
      timestamps: true,
    }
  );

  MerchantCategoryMain.associate = (models) => {
    // 多對多關聯 Merchant <-> MerchantCategoryMain
    MerchantCategoryMain.belongsToMany(models.Merchant, {
      through: models.MerchantCategory,
      foreignKey: "category_id",
      otherKey: "merchant_id",
      as: "merchants",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // 單張圖片關聯
    MerchantCategoryMain.belongsTo(models.Image, {
      foreignKey: "image_id",
      as: "image",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return MerchantCategoryMain;
};
