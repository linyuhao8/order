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
      option_values: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      extra_price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {  tableName: "option_values",timestamps: true }
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
