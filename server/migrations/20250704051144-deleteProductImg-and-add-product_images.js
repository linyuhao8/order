"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. 刪除舊表
    await queryInterface.dropTable("product_imgs");

    // 2. 建立中介表
    await queryInterface.createTable("product_images", {
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      image_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "images",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      sort_order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_main: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addConstraint("product_images", {
      fields: ["product_id", "image_id"],
      type: "primary key",
      name: "pk_product_images",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_images");
    // 必要時可重建 product_img，但視你需求決定
  },
};
