'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    'comments',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'deleted'),
        defaultValue: 'active',
      },
    },
    {
      tableName: 'comments',
      timestamps: true,
    }
  );

  Comments.associate = (models) => {
    Comments.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Comments.belongsTo(models.blog_posts, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
    });
  };

  return Comments;
};
