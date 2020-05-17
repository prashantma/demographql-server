/**
 *
 * Author:  AppSeed.us
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/app-generator/nodejs-starter
 *
 */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../db/Database');
const AccountModel = require('./account.js');
const AccountUserModel = require('./account-user.js');
const ProjectModel = require('./project.js');
const ProjectGroupModel = require('./project-group.js');
const TodoModel = require('./todo.js');

const Account = AccountModel(sequelize, Sequelize);
const AccountUser = AccountUserModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);
const ProjectGroup = ProjectGroupModel(sequelize, Sequelize);
const Todo = TodoModel(sequelize, Sequelize);

AccountUser.belongsTo(Account, {
  foreignKey: 'accountId',
  as: 'fkAccountuserAccount',
  onUpdate: 'RESTRICT',
  onDelete: 'RESTRICT',
});

Project.belongsTo(Account, {
  foreignKey: 'accountId',
  as: 'fkProjectAccount',
  onUpdate: 'RESTRICT',
  onDelete: 'RESTRICT',
});

ProjectGroup.belongsTo(Project, {
  foreignKey: 'projectId',
  as: 'fkProjectGroupProject',
  onUpdate: 'RESTRICT',
  onDelete: 'RESTRICT',
});

ProjectGroup.belongsTo(AccountUser, {
  foreignKey: 'userId',
  as: 'fkProjectGroupAccountUser',
  onUpdate: 'RESTRICT',
  onDelete: 'RESTRICT',
});

AccountUser.hasMany(Todo, {
  foreignKey: 'userId',
  sourceKey: 'userId',
  as: 'fkTodoAccountUser',
  onUpdate: 'RESTRICT',
  onDelete: 'RESTRICT',
});

Project.hasMany(Todo, {
  foreignKey: 'projectId',
  sourceKey: 'projectId',
  as: 'fkTodoProject',
  onUpdate: 'RESTRICT',
  onDelete: 'RESTRICT',
});

module.exports = {
  sequelize,
  Sequelize,
  Account,
  AccountUser,
  Project,
  ProjectGroup,
  Todo,
};

/**
Executing (default): CREATE TABLE IF NOT EXISTS `accounts` (`accountId` VARCHAR(255) NOT NULL PRIMARY KEY, `accountName` VARCHAR(255) NOT NULL UNIQUE, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`accounts`)
Executing (default): PRAGMA INDEX_INFO(`sqlite_autoindex_accounts_1`)
Executing (default): PRAGMA INDEX_INFO(`sqlite_autoindex_accounts_2`)
Executing (default): CREATE TABLE IF NOT EXISTS `accountUsers` (`userId` VARCHAR(255) NOT NULL PRIMARY KEY, `password` VARCHAR(255) NOT NULL, `firstName` VARCHAR(255) NOT NULL, `lastName` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `accountId` VARCHAR(255) REFERENCES `accounts` (`accountId`) ON DELETE RESTRICT ON UPDATE RESTRICT);
Executing (default): PRAGMA INDEX_LIST(`accountUsers`)
Executing (default): PRAGMA INDEX_INFO(`sqlite_autoindex_accountUsers_1`)
Executing (default): CREATE TABLE IF NOT EXISTS `projects` (`projectId` VARCHAR(255) NOT NULL PRIMARY KEY, `projectName` VARCHAR(255) NOT NULL UNIQUE, `projectDescription` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `accountId` VARCHAR(255) REFERENCES `accounts` (`accountId`) ON DELETE RESTRICT ON UPDATE RESTRICT);
Executing (default): PRAGMA INDEX_LIST(`projects`)
Executing (default): PRAGMA INDEX_INFO(`sqlite_autoindex_projects_1`)
Executing (default): PRAGMA INDEX_INFO(`sqlite_autoindex_projects_2`)
Executing (default): CREATE TABLE IF NOT EXISTS `projectGroups` (`projectId` VARCHAR(255) NOT NULL NOT NULL REFERENCES `projects` (`projectId`) ON DELETE RESTRICT ON UPDATE RESTRICT, `userId` VARCHAR(255) NOT NULL NOT NULL REFERENCES `accountUsers` (`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`projectId`, `userId`));
Executing (default): PRAGMA INDEX_LIST(`projectGroups`)
Executing (default): PRAGMA INDEX_INFO(`sqlite_autoindex_projectGroups_1`)
Executing (default): CREATE UNIQUE INDEX `ux_projectgroup_projectId_UserId` ON `projectGroups` (`projectId`, `userId`)
Executing (default): CREATE TABLE IF NOT EXISTS `todos` (`id` INTEGER PRIMARY KEY, `description` VARCHAR(255) NOT NULL, `completed` TINYINT(1), `completionDate` DATETIME, `projectId` VARCHAR(255) NOT NULL REFERENCES `projects` (`projectId`) ON DELETE RESTRICT ON UPDATE RESTRICT, `userId` VARCHAR(255) NOT NULL REFERENCES `accountUsers` (`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`todos`)
Executing (default): CREATE INDEX `ux_todos_projectId_UserId` ON `todos` (`projectId`, `userId`)
 */
