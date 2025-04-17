module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      mime_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "images",
      timestamps: true,
    }
  );

  Image.associate = (models) => {
    Image.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Image.hasMany(models.MCategory, {
      foreignKey: "img_id",
      as: "categories",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    Image.hasMany(models.Merchant, {
      foreignKey: "image_id",
      as: "merchants",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return Image;
};
