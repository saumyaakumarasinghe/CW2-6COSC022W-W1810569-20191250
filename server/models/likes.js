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
    Likes.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Likes.belongsTo(models.BlogPosts, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
    });
  };

  return Likes;
};
