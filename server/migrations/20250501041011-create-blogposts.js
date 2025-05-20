'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blog_posts', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      title: { type: Sequelize.STRING, allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      country: { type: Sequelize.STRING, allowNull: false },
      visitDate: { type: Sequelize.DATE, allowNull: true },
      coverImage: { type: Sequelize.STRING, allowNull: true },
      likes: { type: Sequelize.INTEGER, defaultValue: 0 },
      status: { type: Sequelize.ENUM('active', 'deleted', 'hidden'), defaultValue: 'active' },
      commentsEnabled: { type: Sequelize.BOOLEAN, defaultValue: true },
      likesEnabled: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blog_posts');
  },
};
