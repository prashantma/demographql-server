'use strict';

const sequelize = require('../db/Database');
const { QueryTypes } = require('sequelize');
const { AccountUser } = require('../models');

const validateLogin = async (userId, password) => {
  let result = { sucess: false };
  await AccountUser.findOne({ where: { userId, password } }).then(
    accountUser => {
      result = { success: !!accountUser };
    }
  );
  return result;
};

const getProjectsForUser = async userId => {
  const result = await sequelize.query(
    'SELECT project.* FROM projects as project, projectGroups as projectGroup WHERE projectGroup.userId = $userId AND project.projectId = projectGroup.projectId',
    {
      bind: { userId },
      type: QueryTypes.SELECT,
    }
  );
  if (!result) {
    return { data: [] };
  }
  return { data: !result.length ? [result] : result };
};

module.exports = {
  validateLogin,
  getProjectsForUser,
};
