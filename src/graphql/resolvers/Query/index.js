const {
  AccountUserService,
  ProjectService,
  ProjectGroupService,
  TodoService,
} = require('../../../db');

const getAllForUser = async (_, { projectId, userId }) => {
  let result = [];
  await TodoService.getAllForUser(projectId, userId).then(
    ({ data = [] }) => (result = data)
  );
  return result;
};

const getAllForProject = async (_, { projectId }) => {
  let result = [];
  await TodoService.getAllForProject(projectId).then(
    ({ data = [] }) => (result = data)
  );
  return result;
};

const getProjectsForUser = async (_, { userId }) => {
  let result = [];
  await AccountUserService.getProjectsForUser(userId).then(({ data }) => {
    if (!data) {
      result = [];
    } else {
      result = data.length ? data : [data];
    }
  });
  return result;
};

const getAllProjects = async () => {
  let result = [];
  await ProjectService.getAllProjects().then(
    ({ data = [] }) => (result = data)
  );
  return result;
};

const getUsersForProject = async (_, { projectId }) => {
  let result = [];
  await ProjectGroupService.getUsersForProject(projectId).then(
    ({ data = [] }) => (result = data)
  );
  return result;
};

module.exports = {
  getAllForUser,
  getAllForProject,
  getAllProjects,
  getProjectsForUser,
  getUsersForProject,
};
