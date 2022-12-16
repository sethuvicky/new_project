import logo from './logo.svg';
import './App.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Add from './screens/Add';
import Edit from './screens/View';
import Login from './screens/Login';
import Register from './screens/Register';
import axios from 'axios';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect,useState } from 'react';

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

  const [token,setToken] = useState()
  const [id,setID] = useState()
  const [data,setdata] = useState()

  useEffect(()=>{
   setToken(localStorage.getItem("accessToken"))
   setID(localStorage.getItem("userid"))

  
  },[])
  const logoutHandler = (()=>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userid")
    localStorage.removeItem("username")
    
    setInterval(() => {
      window.location.href = '/'

      
    }, 1000);

  })
  useEffect(()=>{
    axios.get(`http://localhost:3004/user/${id}`).then((data)=>{
        setdata(data.data)
    })
    
    
      },[id])

      console.log(data)
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
  
    <Navbar bg="primary" variant='dark'  expand="lg">
      <Container>
        <Navbar.Brand href="/">Todo List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Add Todo </Nav.Link>
            <Nav.Link href="/edit">View list</Nav.Link>
            {!token &&   <><Nav.Link href="/register">Register</Nav.Link><Nav.Link href="/login">login</Nav.Link></>  }
         


        
          </Nav>
          {data &&  <Nav.Link  style={{marginRight:"40px"}}>{data.email}</Nav.Link>  }

          {token  && <Nav.Link  onClick={()=>{logoutHandler()}}>Logout</Nav.Link>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
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
