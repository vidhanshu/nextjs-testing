import { gql } from "@apollo/client";

export const typeDefs = gql`
    type Query {
        todo(id: ID!): todo
        todos: [todo]!
    }
    type Mutation {
        createTodo(todoDetails: createTodoInput!): todo!
        deleteTodo(id:ID!): todo!
    }

    type todo {
        id: String!
        title: String!
        description: String
        completed: Boolean
    }

    input createTodoInput {
        title: String!
        description: String
        completed: Boolean
    }
`