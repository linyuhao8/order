// models/image.js
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "images", // 指定表格名稱
      timestamps: true, // 启用时间戳（createdAt 和 updatedAt）
    }
  );

  return Image;
};
