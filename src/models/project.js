'use strict';

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    projectId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        len: [8, 12],
      },
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    projectDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Project;
};
