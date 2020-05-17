const { withFilter } = require('graphql-subscriptions');
const {
  pubsub,
  TODO_ADDED,
  TODO_EDITED,
  TODO_MARKED_AS_COMPLETED,
} = require('../pubsub');

const todoAdded = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(TODO_ADDED),
    (/* payload, variables */) => {
      // console.log(payload, variables);
      // return payload.about === variables.about;
      return true;
    }
  ),
  resolve: payload => payload,
};

const todoEdited = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(TODO_EDITED),
    (/* payload, variables */) => {
      // console.log(payload, variables);
      // return payload.about === variables.about;
      return true;
    }
  ),
  resolve: payload => payload,
};

const todoMarkedAsCompleted = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(TODO_MARKED_AS_COMPLETED),
    (payload /*, variables */) => {
      // console.log('todoMarkedAsCompleted', 'filter', payload, variables);
      const { success } = payload || {};
      // return payload.about === variables.about;
      return success;
    }
  ),
  resolve: payload => {
    const { success, todo } = payload || {};
    return { success, ...todo };
  },
};

module.exports = {
  todoAdded,
  todoEdited,
  todoMarkedAsCompleted,
};
