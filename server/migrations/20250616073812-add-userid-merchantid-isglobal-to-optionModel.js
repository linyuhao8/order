"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("options", "user_id", {
      type: Sequelize.UUID,
      allowNull: true,
    });

    await queryInterface.addColumn("options", "merchant_id", {
      type: Sequelize.UUID,
      allowNull: true,
    });

    await queryInterface.addColumn("options", "is_global", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("options", "user_id");
    await queryInterface.removeColumn("options", "merchant_id");
    await queryInterface.removeColumn("options", "is_global");
  },
};
