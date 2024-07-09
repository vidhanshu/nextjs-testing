import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
    mutation CreateTodo($todoDetails: createTodoInput!) {
        createTodo(todoDetails: $todoDetails) {
            id
            title
            description
            completed
        }
    }
`

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!){
        deleteTodo(id: $id){
            id
            title
            description
            completed
        }
    }
`