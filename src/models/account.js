'use strict';

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('account', {
    accountId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        len: [8, 12],
      },
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Account;
};
