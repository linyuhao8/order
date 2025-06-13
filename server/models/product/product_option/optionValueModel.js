module.exports = (sequelize, DataTypes) => {
  const OptionValue = sequelize.define(
    "OptionValue",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      option_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "options",
          key: "id",
        },
      },
      values: {
        // 改名為 values
        type: DataTypes.STRING,
        allowNull: false,
      },
      extra_price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      is_default: {
        // 新增欄位 is_default
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      sort_order: {
        // 新增欄位 sort_order
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "option_values",
      timestamps: true,
    }
  );

  OptionValue.associate = (models) => {
    OptionValue.belongsTo(models.Option, {
      foreignKey: "option_id",
      as: "options",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return OptionValue;
};
