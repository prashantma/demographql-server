'use strict';

const AccountUserService = require('./AccountUserService');
const ProjectService = require('./ProjectService');
const ProjectGroupService = require('./ProjectGroupService');
const TodoService = require('./TodoService');

module.exports = async () => {
  await AccountUserService.validateLogin('USER0001', 'password').then(
    response => {
      console.log(
        `AccountUserService.validateLogin: ${
          response.success ? 'Pass' : 'Login failed - false negative'
        }`
      );
    }
  );
  await AccountUserService.validateLogin('USER0002', 'password1').then(
    response => {
      console.log(
        `AccountUserService.validateLogin: ${
          response.success ? 'Login successful - false positive' : 'Pass'
        }`
      );
    }
  );
  await AccountUserService.getProjectsForUser('USER0001').then(response => {
    console.log(
      `AccountUserService.getProjectsForUser: ${
        response.data.length ? 'Pass' : 'Failed'
      }`
    );
  });
  await ProjectService.getAllProjects().then(response => {
    console.log(
      `ProjectService.getAllProjects: ${
        response.data.length ? 'Pass' : 'Failed'
      }`
    );
  });
  await ProjectGroupService.getUsersForProject('PROJ0001').then(response => {
    console.log(
      `ProjectGroupService.getUsersForProject: ${
        response.data.length ? 'Pass' : 'Failed'
      }`
    );
  });
  await TodoService.getAll('PROJ0001').then(response => {
    // console.log(response.data);
    console.log(
      `TodoService.getAll: ${response.data.length ? 'Pass' : 'Fail'}`
    );
  });
  await TodoService.getAllForUser('PROJ0001', 'USER0001').then(response => {
    // console.log(response.data);
    console.log(
      `TodoService.getAllForUser: ${response.data.length ? 'Pass' : 'Fail'}`
    );
  });
  /*
  await TodoService.addTodo({ description: 'Find store', completed: false, projectId: 'PROJ0001', userId: 'USER0001' }).then(response => {
    console.log(response);
    console.log(`TodoService.addTodo: ${response.sucess && response.id ? "Pass" : "Fail"}`);
  });
  */
  await TodoService.editTodo({
    description: 'Find store 5',
    completed: false,
    completionDate: null,
    id: 5,
  }).then(response => {
    // console.log(response);
    console.log(`TodoService.editTodo: ${response.success ? 'Pass' : 'Fail'}`);
  });
  await TodoService.markAsComplete(5).then(response => {
    // console.log(response);
    console.log(
      `TodoService.markAsComplete: ${response.success ? 'Pass' : 'Fail'}`
    );
  });
};
