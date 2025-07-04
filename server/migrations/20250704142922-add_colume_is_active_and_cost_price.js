"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 新增 is_active 欄位，預設為 true
    await queryInterface.addColumn("products", "is_active", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    // 新增 cost_price 欄位，允許為 null
    await queryInterface.addColumn("products", "cost_price", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 回滾刪除欄位
    await queryInterface.removeColumn("products", "is_active");
    await queryInterface.removeColumn("products", "cost_price");
  },
};
