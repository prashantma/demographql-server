'use strict';

const { Todo } = require('../models');
const { dateToNumber } = require('../utils/dateUtils');

const getAll = async projectId => {
  let result = {};
  await Todo.findAll({ where: { projectId } }).then(todos => {
    result = {
      data: todos.map(todo => {
        const { id, description, completed, completionDate, userId } = todo;
        return {
          id,
          description,
          completed,
          completionDate: dateToNumber(completionDate),
          projectId,
          userId,
        };
      }),
    };
  });
  return result;
};

const getAllForUser = async (projectId, userId) => {
  let result = {};
  await Todo.findAll({ where: { projectId, userId } }).then(todos => {
    result = {
      data: todos.map(todo => {
        const { id, description, completed, completionDate } = todo;
        return {
          id,
          description,
          completed,
          completionDate: dateToNumber(completionDate),
          projectId,
          userId,
        };
      }),
    };
  });
  return result;
};

const getAllForProject = async projectId => {
  let result = {};
  await Todo.findAll({ where: { projectId } }).then(todos => {
    result = {
      data: todos.map(todo => {
        const { id, description, completed, completionDate, userId } = todo;
        return {
          id,
          description,
          completed,
          completionDate: dateToNumber(completionDate),
          projectId,
          userId,
        };
      }),
    };
  });
  return result;
};

const addTodo = async todo => {
  let result = { sucess: false };
  let lastId = null;
  await Todo.max('id').then(max => {
    lastId = max + 1;
  });
  const newTodo = { ...todo, completed: false, id: lastId };
  await Todo.create(newTodo)
    .then(() => {
      result = {
        success: true,
        todo: newTodo,
      };
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

const editTodo = async todo => {
  let result = { sucess: false };
  const { id, description, completed, completionDate } = todo;
  const todoData = {
    description,
    completed,
    completionDate,
  };
  const editedTodo = { ...todoData };
  await Todo.update(editedTodo, { where: { id } })
    .then(() => {
      result = {
        success: true,
        todo: { id, ...editedTodo },
      };
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

const markAsComplete = async id => {
  let result = { sucess: false };
  const completionDate = new Date();
  const completedTodo = {
    completed: true,
    completionDate,
  };
  await Todo.update(completedTodo, { where: { id } })
    .then(() => {
      result = {
        success: true,
        id,
        completionDate: dateToNumber(completionDate),
      };
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

module.exports = {
  getAll,
  getAllForUser,
  getAllForProject,
  addTodo,
  editTodo,
  markAsComplete,
};
