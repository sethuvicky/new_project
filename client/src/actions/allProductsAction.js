
import { ALL_TODO_REQUEST,
    ALL_TODO_SUCCESS,
    ALL_TODO_FAIL,TODO_EDIT_FAIL,TODO_EDIT_REQUEST,
    TODO_EDIT_SUCCESS,TODO_DELETE_FAIL,TODO_DELETE_REQUEST,TODO_DELETE_SUCCESS } from "../constants/AllTodo";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const getTodo= () => async (dispatch)=>{
    const client = new ApolloClient({
        uri: 'http://localhost:3004/graphql',
        cache: new InMemoryCache(),
      });
    try {
        dispatch({
            type: ALL_TODO_REQUEST
        });
  
     
        const {data} = await client
        .query({
          query: gql`
          query{
            getAllTodos{
              title
              id
            }
          }
          `,
        })
     
        dispatch({
            type:ALL_TODO_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type:ALL_TODO_FAIL,
            payload: error.response.data.message,
        })
    }
  }; 


  export const EditTodo= (edit,editInput) => async (dispatch)=>{
    console.log(edit,editInput)
    const client = new ApolloClient({
        uri: 'http://localhost:3004/graphql',
        cache: new InMemoryCache(),
      });
    try {
        dispatch({
            type: TODO_EDIT_REQUEST
        });
  
     
        const {data} = await client
        .mutate({
            mutation: gql`
            mutation{
              updateTodo(id:${edit},title:"${editInput}") {
                id
              }
            }
            `,
          })
     
        dispatch({
            type:TODO_EDIT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type:TODO_EDIT_FAIL,
            payload: error.response.data.message,
        })
    }
  }; 
  export const DeleteTodo= (id) => async (dispatch)=>{

    // const [deleteTodo, { error }] = useMutation(DELETE_USER_MUTATION);

    const client = new ApolloClient({
        uri: 'http://localhost:3004/graphql',
        cache: new InMemoryCache(),
      });
    try {
        dispatch({
            type: TODO_DELETE_REQUEST
        });
  
     
        const {data} = await client
        .mutate({
          mutation: gql`
          mutation{
            deleteTodo(id:${id})
          }
          `,
        })
     
     
        dispatch({
            type:TODO_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type:TODO_EDIT_FAIL,
            payload: error.response.data.message,
        })
    }
  }; 
  