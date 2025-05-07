'use strict';

module.exports = (sequelize, DataTypes) => {
  const Follows = sequelize.define(
    'follows',
    {
      followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      followedId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'follows',
      timestamps: true,
    }
  );

  Follows.associate = (models) => {
    Follows.belongsTo(models.Users, {
      foreignKey: 'followerId',
      as: 'Follower',
      onDelete: 'CASCADE',
    });

    Follows.belongsTo(models.Users, {
      foreignKey: 'followedId',
      as: 'Followed',
      onDelete: 'CASCADE',
    });
  };

  return Follows;
};
