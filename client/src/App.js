import logo from './logo.svg';
import './App.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Add from './screens/Add';
import Edit from './screens/View';
import Login from './screens/Login';
import Register from './screens/Register';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:3004/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
  
 
    <Routes>
      <Route path="/" element={<Add/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route path="/edit" element={<Edit/>} />

    
    </Routes>
  </BrowserRouter>
  </ApolloProvider>
  );
}

export default App;
