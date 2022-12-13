import { gql } from "@apollo/client";

export const GET_ALL_TODO = gql`
query{
    getAllTodos{
      title
      id
    }
  }
`