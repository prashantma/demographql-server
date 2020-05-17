'use strict';

const sequelize = require('../db/Database');
const { QueryTypes } = require('sequelize');

const getUsersForProject = async projectId => {
  const result = await sequelize.query(
    'SELECT accountUser.* FROM accountUsers as accountUser, projectGroups as projectGroup WHERE projectGroup.projectId = $projectId AND accountUser.userId = projectGroup.userId',
    {
      bind: { projectId },
      type: QueryTypes.SELECT,
    }
  );
  // console.log('getUsersForProject', result);
  if (!result) {
    return { data: [] };
  }
  return { data: !result.length ? [result] : result };
};

module.exports = {
  getUsersForProject,
};
