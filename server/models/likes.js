'use strict';

module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    'likes',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'likes',
      timestamps: true,
    }
  );

  Likes.associate = (models) => {
    Likes.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Likes.belongsTo(models.blog_posts, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
      as: 'post',
    });
  };

  return Likes;
};
