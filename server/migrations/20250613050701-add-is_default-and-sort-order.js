"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. 改欄位名稱 option_values -> values
    await queryInterface.renameColumn(
      "option_values",
      "option_values",
      "values"
    );

    // 2. 新增 is_default 欄位
    await queryInterface.addColumn("option_values", "is_default", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    // 3. 新增 sort_order 欄位
    await queryInterface.addColumn("option_values", "sort_order", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 回滾時先移除新增欄位
    await queryInterface.removeColumn("option_values", "is_default");
    await queryInterface.removeColumn("option_values", "sort_order");

    // 再把欄位名稱改回 option_values
    await queryInterface.renameColumn(
      "option_values",
      "values",
      "option_values"
    );
  },
};
