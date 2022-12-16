import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createTodo(
    $title: String!,
    $USERId:Int !
    
  ) {
    createTodo(
        title: $title,
        USERId:  $USERId

     
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

