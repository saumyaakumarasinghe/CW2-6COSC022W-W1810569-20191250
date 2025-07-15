'use strict';

module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define(
    'blog_posts',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visitDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM('active', 'deleted', 'hidden'),
        defaultValue: 'active',
      },
      commentsEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      likesEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'blog_posts',
      timestamps: true,
    }
  );

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    BlogPosts.hasMany(models.comments, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
    });

    BlogPosts.hasMany(models.likes, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
      as: 'postLikes',
    });
  };

  return BlogPosts;
};
