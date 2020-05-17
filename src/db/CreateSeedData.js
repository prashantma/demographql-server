'use strict';

const models = require('../models');
const seedData = require('./seeddata');

const createSeedData = async () => {
  console.log('creating seed data...');

  console.log('Preparing Account data...');
  await Promise.all(
    seedData.accounts.map(async seedAccount => {
      const { accountId } = seedAccount;
      await models.Account.findByPk(accountId).then(async account => {
        if (!account) {
          await models.Account.create(seedAccount).then(() => {
            console.log(`added account: ${accountId}`);
          });
        } else {
          const { accountId, createdAt } = account;
          console.log('Using existing Account...', accountId, createdAt);
        }
        return Promise.resolve();
      });
    })
  );

  console.log('Preparing Account User data...');
  await Promise.all(
    seedData.accountUsers.map(async seedAccountUser => {
      const { userId } = seedAccountUser;
      await models.AccountUser.findByPk(userId).then(async accountUser => {
        if (!accountUser) {
          await models.AccountUser.create(seedAccountUser).then(() => {
            console.log(`added user: ${userId}`);
          });
        } else {
          const {
            userId,
            firstName,
            lastName,
            accountId,
            createdAt,
          } = accountUser;
          console.log('Using existing User...', {
            userId,
            firstName,
            lastName,
            accountId,
            createdAt,
          });
        }
        return Promise.resolve();
      });
    })
  );

  console.log('Preparing Project data...');
  await Promise.all(
    seedData.projects.map(async seedProject => {
      const { projectId } = seedProject;
      await models.Project.findByPk(projectId).then(async project => {
        if (!project) {
          await models.Project.create(seedProject).then(() => {
            console.log(`added project: ${projectId}`);
          });
        } else {
          const {
            projectId,
            projectName,
            projectDescription,
            accountId,
            createdAt,
          } = project;
          console.log('Using existing Project...', {
            projectId,
            projectName,
            projectDescription,
            accountId,
            createdAt,
          });
        }
        return Promise.resolve();
      });
    })
  );

  console.log('Preparing Project Group data...');
  await Promise.all(
    seedData.projectGroups.map(async seedProjectGroup => {
      const { projectId, userId } = seedProjectGroup;
      await models.ProjectGroup.findOne({ where: { projectId, userId } }).then(
        async projectGroup => {
          if (!projectGroup) {
            await models.ProjectGroup.create(seedProjectGroup).then(() => {
              console.log(`added project group: [${projectId}, ${userId}]`);
            });
          } else {
            const { projectId, userId } = projectGroup;
            console.log('Using existing Project Group...', {
              projectId,
              userId,
            });
          }
        }
      );
      return Promise.resolve();
    })
  );

  console.log('Preparing Todo data...');
  await Promise.all(
    seedData.todos.map(async seedTodo => {
      const { id: todoId } = seedTodo;
      await models.Todo.findByPk(todoId).then(async todo => {
        if (!todo) {
          await models.Todo.create(seedTodo).then(() => {
            console.log(`added todo: ${todoId}`);
          });
        } else {
          const { id, description } = todo;
          console.log('Using existing Todo...', { id, description });
        }
      });
      return Promise.resolve();
    })
  );

  console.log('creation of seed data completed.');
};

module.exports = createSeedData;
