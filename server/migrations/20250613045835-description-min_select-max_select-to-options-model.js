"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 新增 description, min_select, max_select 欄位
    await queryInterface.addColumn("options", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn("options", "min_select", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("options", "max_select", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // 修改 type enum：新增 select, checkbox, text, number （假設原本是有這些）
    // 如果你想要改 enum 的內容，需要先刪除 enum 再新增，Postgres 要用特殊寫法
    // Sequelize CLI 沒有直接支援 enum 修改，這裡用 raw query
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_options_type" RENAME TO "enum_options_type_old";
    `);

    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_options_type" AS ENUM('select', 'checkbox', 'text', 'number');
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "options" ALTER COLUMN "type" TYPE "enum_options_type" USING "type"::text::enum_options_type;
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE "enum_options_type_old";
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // 回復 type enum 到舊的設定（你要先知道原本 enum 是什麼，這裡以舊 enum 名稱假設）
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_options_type_old" AS ENUM('select', 'text', 'number', 'checkbox');
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "options" ALTER COLUMN "type" TYPE "enum_options_type_old" USING "type"::text::enum_options_type_old;
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE "enum_options_type";
    `);

    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_options_type_old" RENAME TO "enum_options_type";
    `);

    // 移除欄位
    await queryInterface.removeColumn("options", "description");
    await queryInterface.removeColumn("options", "min_select");
    await queryInterface.removeColumn("options", "max_select");
  },
};
