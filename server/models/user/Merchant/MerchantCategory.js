module.exports = (sequelize, DataTypes) => {
  const MerchantCategory = sequelize.define(
    "MerchantCategory",
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
      merchant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "merchants",
          key: "id",
        },
      },
    },
    {
      tableName: "merchant_categories",
      timestamps: true,
    }
  );

  // Association setup (optional, if you need to establish a relationship with the User model)
  MerchantCategory.associate = (models) => {
    MerchantCategory.belongsTo(models.Merchant, {
      foreignKey: "merchant_id",
      as: "merchant",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return MerchantCategory;
};
