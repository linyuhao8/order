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
        type: DataTypes.STRING, // 若未轉成 Image 關聯前的舊欄位
        allowNull: true,
      },
      img_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "images",
          key: "id",
        },
        onDelete: "SET NULL", // 建議放這裡以防 migration 不一致
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "m_categories",
      timestamps: true,
    }
  );

  MCategory.associate = (models) => {
    // 多對多：MCategory <--> Merchant
    MCategory.belongsToMany(models.Merchant, {
      through: models.MerchantCategory,
      foreignKey: "category_id",
      otherKey: "merchant_id",
      as: "merchants",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // 一對一：MCategory --> Image
    MCategory.belongsTo(models.Image, {
      foreignKey: "img_id",
      as: "image",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return MCategory;
};
