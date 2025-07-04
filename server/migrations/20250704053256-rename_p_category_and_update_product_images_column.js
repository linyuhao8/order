"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 改表名（複數形式）
    await queryInterface.renameTable("p_categories", "product_categories_main");

    // 刪除 img 欄位
    await queryInterface.removeColumn("product_categories_main", "img");

    // 新增 image_id 欄位，參考 images.id
    await queryInterface.addColumn("product_categories_main", "image_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "images",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    // 回滾刪除 image_id
    await queryInterface.removeColumn("product_categories_main", "image_id");

    // 回滾加回 img 欄位
    await queryInterface.addColumn("product_categories_main", "img", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // 回滾改表名回去
    await queryInterface.renameTable("product_categories_main", "p_categories");
  },
};
