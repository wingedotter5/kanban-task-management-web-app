import { gql } from '@apollo/client';

const BOARD_DETAILS = gql`
  fragment BoardDetails on Board {
    id
    name
    columns {
      id
      name
      tasks {
        id
        title
        description
        columnId
        subtasks {
          id
          title
          isCompleted
        }
      }
    }
  }
`;

const TASK_DETAILS = gql`
  fragment TaskDetails on Task {
    id
    title
    description
    columnId
    subtasks {
      id
      title
      isCompleted
    }
  }
`;

export const GET_BOARDS = gql`
  query GetBoards {
    getBoards {
      id
      name
    }
  }
`;

export const GET_BOARD = gql`
  ${BOARD_DETAILS}
  query GetBoard($id: ID!) {
    getBoard(id: $id) {
      ...BoardDetails
    }
  }
`;

export const CREATE_BOARD = gql`
  mutation CreateBoard($name: String!, $columns: [String!]) {
    createBoard(name: $name, columns: $columns) {
      id
      name
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoard($id: ID!) {
    deleteBoard(id: $id)
  }
`;

export const EDIT_BOARD = gql`
  ${BOARD_DETAILS}
  mutation EditBoard(
    $id: ID!
    $name: String
    $deletedColumnIds: [ID!]
    $modifiedColumns: [ColumnInput!]
    $newColumns: [String!]
  ) {
    editBoard(
      id: $id
      name: $name
      deletedColumnIds: $deletedColumnIds
      modifiedColumns: $modifiedColumns
      newColumns: $newColumns
    ) {
      ...BoardDetails
    }
  }
`;

export const CREATE_TASK = gql`
  ${TASK_DETAILS}
  mutation CreateTask(
    $title: String!
    $description: String
    $columnId: ID!
    $subtasks: [String!]
  ) {
    createTask(
      title: $title
      description: $description
      columnId: $columnId
      subtasks: $subtasks
    ) {
      ...TaskDetails
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export const EDIT_TASK = gql`
  ${TASK_DETAILS}
  mutation EditTask(
    $id: ID!
    $title: String
    $description: String
    $columnId: ID!
    $deletedSubtaskIds: [ID!]
    $modifiedSubtasks: [SubtaskInput!]
    $newSubtasks: [String!]
  ) {
    editTask(
      id: $id
      title: $title
      description: $description
      columnId: $columnId
      deletedSubtaskIds: $deletedSubtaskIds
      modifiedSubtasks: $modifiedSubtasks
      newSubtasks: $newSubtasks
    ) {
      ...TaskDetails
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;
