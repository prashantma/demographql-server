const { gql } = require('apollo-server-express');

const typeDefs = gql`
  directive @dateFormat(
    format: String = "YYYY-MM-DD hh:mm:ss A"
  ) on FIELD_DEFINITION

  type Account {
    accountId: String!
    accountName: String!
  }

  type AccountUser {
    userId: String!
    firstName: String!
    lastName: String!
    account: Account!
  }

  type Project {
    projectId: String!
    projectName: String!
    projectDescription: String!
  }

  type ProjectGroup {
    project: Project!
    accountUser: AccountUser!
  }

  type Todo {
    id: ID!
    description: String!
    completed: Boolean!
    completionDate: String! @dateFormat
    projectId: String!
    userId: String!
  }

  input TodoInput {
    id: Int
    description: String!
    projectId: String
    userId: String
  }

  input TodoReferenceInput {
    id: Int!
  }

  interface BasicMutationResponse {
    success: Boolean
  }

  type TodoMutationResponse implements BasicMutationResponse {
    success: Boolean
    id: Int
  }

  type TodoSubscriptionResponse implements BasicMutationResponse {
    success: Boolean
    todo: Todo
  }

  type MarkAsCompleteResponse implements BasicMutationResponse {
    success: Boolean
    id: Int
    completionDate: String @dateFormat
  }

  type Query {
    getAllForUser(projectId: String!, userId: String!): [Todo!]
    getAllForProject(projectId: String!): [Todo!]
    getAllProjects: [Project!]
    getUsersForProject(projectId: String!): [AccountUser!]
    getProjectsForUser(userId: String!): [Project!]
  }

  type Mutation {
    addTodo(todo: TodoInput!): TodoMutationResponse
    editTodo(todo: TodoInput!): TodoMutationResponse
    markAsComplete(todo: TodoReferenceInput!): MarkAsCompleteResponse
  }

  type Subscription {
    todoAdded(about: String!): TodoSubscriptionResponse
    todoEdited(about: String!): TodoSubscriptionResponse
    todoMarkedAsCompleted(about: String!): MarkAsCompleteResponse
  }
`;

module.exports = typeDefs;
