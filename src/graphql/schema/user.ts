import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
  }
  extend type Mutation {
    addUser(username: String!): User!
  }
  extend type Subscription {
    userAdded: User!
  }

  type User {
    id: ID!
    username: String!
    books: [Book!]
  }

  type Book {
    id: ID!
    name: String!
    
  }
`;