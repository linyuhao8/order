"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. 資料表改名
    await queryInterface.renameTable("o_categories", "option_categories_main");

    // 2. 中介表的欄位名稱改為 option_categories_main_id
    await queryInterface.renameColumn(
      "option_categories",
      "o_category_id",
      "option_categories_main_id"
    );
  },

  down: async (queryInterface, Sequelize) => {
    // 回滾：改回原本的表與欄位名
    await queryInterface.renameTable("option_categories_main", "o_categories");

    await queryInterface.renameColumn(
      "option_categories",
      "option_categories_main_id",
      "o_category_id"
    );
  },
};
