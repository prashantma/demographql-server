'use strict';

module.exports = (sequelize, DataTypes) => {
  const AccountUser = sequelize.define('accountUser', {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        len: [8, 12],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return AccountUser;
};
