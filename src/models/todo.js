'use strict';

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'todo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
      },
      completionDate: {
        type: DataTypes.DATE,
      },
      projectId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          name: 'ux_todos_projectId_UserId',
          unique: false,
          fields: ['projectId', 'userId'],
        },
      ],
    }
  );

  return Todo;
};
