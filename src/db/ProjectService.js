'use strict';

const { Project } = require('../models');

const getAllProjects = async () => {
  let result = {};
  await Project.findAll().then(projects => {
    result = {
      data: projects.map(project => {
        const { projectId, projectName, projectDescription } = project;
        return {
          projectId,
          projectName,
          projectDescription,
        };
      }),
    };
  });
  // console.log('getAll', result);
  return result;
};

module.exports = {
  getAllProjects,
};
