"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 新增欄位
    await queryInterface.addColumn("product_options", "required", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });

    await queryInterface.addColumn("product_options", "sort_order", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // 移除不需要的欄位
    await queryInterface.removeColumn("product_options", "is_custom");
    await queryInterface.removeColumn("product_options", "merchant_id");
  },

  down: async (queryInterface, Sequelize) => {
    // 還原欄位
    await queryInterface.addColumn("product_options", "is_custom", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    await queryInterface.addColumn("product_options", "merchant_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "merchants",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    await queryInterface.removeColumn("product_options", "required");
    await queryInterface.removeColumn("product_options", "sort_order");
  },
};
