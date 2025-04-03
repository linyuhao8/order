module.exports = (sequelize, DataTypes) => {
  const MCategory = sequelize.define(
    "MCategory",
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
      img: {
        type: DataTypes.STRING, // 存圖片 URL
        allowNull: true,
      },
    },
    {
      tableName: "m_categories",
      timestamps: true, // 會自動加入 createdAt、updatedAt 欄位
    }
  );

  MCategory.associate = (models) => {
    MCategory.belongsToMany(models.Merchant, {
      through: models.MerchantCategory,
      foreignKey: "category_id",
      otherKey: "merchant_id",
      as: "merchants",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return MCategory;
};
