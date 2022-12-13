import { ALL_TODO_REQUEST,ALL_TODO_SUCCESS,ALL_TODO_FAIL } from "../constants/AllTodo";

export const TodoReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_TODO_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_TODO_SUCCESS:
      return {
        loading: false,
        Todo: action.payload,
      };

  

    case ALL_TODO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
  
    default:
      return state;
  }
};