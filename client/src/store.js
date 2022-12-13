import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    TodoReducer,
  
} from "./reducers/AllTodoReducer";
   

const reducer = combineReducers({
  Todo: TodoReducer,

});

let initialState = {
  
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
