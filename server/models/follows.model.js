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
    Follows.belongsTo(models.users, {
      foreignKey: 'followerId',
      as: 'Follower',
      onDelete: 'CASCADE',
    });

    Follows.belongsTo(models.users, {
      foreignKey: 'followedId',
      as: 'Followed',
      onDelete: 'CASCADE',
    });
  };

  return Follows;
};
