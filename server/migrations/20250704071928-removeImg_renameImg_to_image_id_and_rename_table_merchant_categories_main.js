"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. 移除 img 欄位
    await queryInterface.removeColumn("m_categories", "img");

    // 2. 先新增 image_id 欄位
    await queryInterface.addColumn("m_categories", "image_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "images",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    // 3. 刪除舊的 img_id 欄位
    await queryInterface.removeColumn("m_categories", "img_id");

    // 4. 改表名
    await queryInterface.renameTable(
      "m_categories",
      "merchant_categories_main"
    );
  },

  async down(queryInterface, Sequelize) {
    // 回滾動作與 up 相反順序

    // 1. 改回表名
    await queryInterface.renameTable(
      "merchant_categories_main",
      "m_categories"
    );

    // 2. 新增 img_id 回來
    await queryInterface.addColumn("m_categories", "img_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "images",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    // 3. 移除 image_id 欄位
    await queryInterface.removeColumn("m_categories", "image_id");

    // 4. 加回 img 欄位
    await queryInterface.addColumn("m_categories", "img", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
