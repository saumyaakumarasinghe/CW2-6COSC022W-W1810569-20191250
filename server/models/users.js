'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastActivateAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isSubscribed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.blog_posts, {
      foreignKey: 'userId',
      as: 'posts',
    });
    Users.hasMany(models.comments, {
      foreignKey: 'userId',
      as: 'comments',
    });
    Users.hasMany(models.likes, {
      foreignKey: 'userId',
      as: 'likes',
    });
  };

  return Users;
};
