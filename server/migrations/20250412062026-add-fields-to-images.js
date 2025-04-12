'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn("images", "storage_filename", {
       type: Sequelize.STRING,
       allowNull: false,
       defaultValue: "",
     });
     await queryInterface.addColumn("images", "mime_type", {
       type: Sequelize.STRING,
       allowNull: false,
       defaultValue: "image/jpeg",
     });
     await queryInterface.addColumn("images", "size", {
       type: Sequelize.INTEGER,
       allowNull: false,
       defaultValue: 0,
     });
     await queryInterface.addColumn("images", "width", {
       type: Sequelize.INTEGER,
       allowNull: true,
     });
     await queryInterface.addColumn("images", "height", {
       type: Sequelize.INTEGER,
       allowNull: true,
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn("images", "storage_filename");
    await queryInterface.removeColumn("images", "mime_type");
    await queryInterface.removeColumn("images", "size");
    await queryInterface.removeColumn("images", "width");
    await queryInterface.removeColumn("images", "height");
  },
};
