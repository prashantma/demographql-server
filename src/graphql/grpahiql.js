const { gql } = require('apollo-server-express');

// eslint-disable-next-line no-unused-vars
const tests = gql`
# Write your query or mutation here
  query getAllForUser($projectId: String!, $userId: String!) {
    getAllForUser(projectId: $projectId, userId: $userId) {
      id
      projectId
      userId
      description
      completed
      completionDate
    }
  }

  query getProjectsForUser($userId: String!) {
    getProjectsForUser(userId: $userId) {
      projectId
      projectName
      projectDescription
    }
  }

  mutation markAsCompleted($todo: TodoReferenceInput!) {
    markAsComplete(todo: $todo) {
      success
      id
      completionDate
    }
  }

  subscription todoMarkedAsCompleted {
    todoMarkedAsCompleted(about: "todo") {
      success
      id
      completionDate
    }
  }

  mutation addTodo($todo: TodoInput!) {
    addTodo(todo: $todo) {
      success
      id
    }
  }

  subscription todoAdded {
    todoAdded(about: "todo") {
      success
      todo {
        id
        description
        projectId
        userId
      }
    }
  }

  mutation editTodo($todo: TodoInput!) {
    editTodo(todo: $todo) {
      success
      id
    }
  }

  subscription todoEdited {
    todoEdited(about: "todo") {
      success
      todo {
        id
        description
      }
    }
  }

  query getUsersForProject($projectId: String!) {
    getUsersForProject(projectId: $projectId) {
      userId
      firstName
      lastName
    }
  }

  query getAllProjects {
    getAllProjects {
      projectId
      projectName
      projectDescription
    }
  }

  query getAllForProject($projectId: String!) {
    getAllForProject(projectId: $projectId) {
      id
      projectId
      userId
      description
      completed
      completionDate
    }
  }
}
`;

/**
 * Query Variables
{
  "userId": "USER0001",
  "projectId": "PROJ0001"
}

{
  "todo": {
    "id": 5
  }
}

{
  "todo": {
    "id": 5,
    "description": "Find launchpad",
    "projectId": "PROJ0001",
    "userId": "USER0001"
  }

  {
  "projectId": "PROJ0001"
  }

  {
    "userId": "USER0001",
  }
}
*/
