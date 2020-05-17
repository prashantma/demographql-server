const { TodoService } = require('../../../db');
const {
  pubsub,
  TODO_ADDED,
  TODO_EDITED,
  TODO_MARKED_AS_COMPLETED,
} = require('../pubsub');

const addTodo = async (_, { todo }) => {
  let result = {};
  await TodoService.addTodo(todo).then(response => (result = response));
  if (result.success) {
    const { success, todo } = result;
    result = { success, id: todo.id };
    pubsub.publish(TODO_ADDED, { success, todo });
  }
  return result;
};

const editTodo = async (_, { todo }) => {
  let result = {};
  await TodoService.editTodo(todo).then(response => (result = response));
  if (result.success) {
    const { success, todo } = result;
    result = { success, id: todo.id };
    pubsub.publish(TODO_EDITED, { success, todo });
  }
  return result;
};

const markAsComplete = async (_, { todo: { id } }) => {
  let result = {};
  await TodoService.markAsComplete(id).then(response => (result = response));
  if (result.success) {
    const { success, ...todo } = result;
    pubsub.publish(TODO_MARKED_AS_COMPLETED, { success, todo });
  }
  return result;
};

module.exports = {
  addTodo,
  editTodo,
  markAsComplete,
};
