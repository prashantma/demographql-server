'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProjectGroup = sequelize.define(
    'projectGroup',
    {
      projectId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          name: 'ux_projectgroup_projectId_UserId',
          unique: true,
          fields: ['projectId', 'userId'],
        },
      ],
    }
  );

  return ProjectGroup;
};
