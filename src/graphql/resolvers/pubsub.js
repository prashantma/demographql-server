const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const TODO_ADDED = 'todoAdded';
const TODO_EDITED = 'todoEdited';
const TODO_MARKED_AS_COMPLETED = 'todoMarkedAsCompleted';

module.exports = {
  pubsub,
  TODO_ADDED,
  TODO_EDITED,
  TODO_MARKED_AS_COMPLETED,
};
