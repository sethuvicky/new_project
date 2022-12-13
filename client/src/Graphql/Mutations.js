import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createTodo(
    $title: String!
    
  ) {
    createTodo(
        title: $title
     
    ) {
      id
    }
  }
`

 export const DELETE_USER_MUTATION = gql`
mutation deleteTodo(
  $id: Int!
  
) {
    deleteTodo(
      id: $id
   
  ) 
}
`

export const UPDATE_USER_MUTATION = gql`
mutation updateTodo(
  $id: Int!,
  $title:String!
  
) {
    updateTodo(
      id: $id,
      title:$title


   
  ) 
}
`

