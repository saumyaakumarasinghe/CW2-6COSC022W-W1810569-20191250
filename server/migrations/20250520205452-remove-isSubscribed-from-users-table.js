'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'isSubscribed');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'isSubscribed', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
