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
import ProtectedRoute from './routes/ProductedRoutes';

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
  let [isAuth,setisAuth] = useState(false)

  useEffect(()=>{
 
    axios.get("http://localhost:3004/isAuthenticated",{ withCredentials: true }).then((data)=>{
      setisAuth(true)
      localStorage.setItem("userid",data.data.id)
      console.log(data)
       
      }).catch((err)=>{
         setisAuth(false)
   
      })
   
   

  
  },[])
  

  const logoutHandler = (()=>{
    axios.get(`http://localhost:3004/logout`,{ withCredentials: true }).then((data)=>{
      window.location.href = '/'  })
    
    // setInterval(() => {
    //   window.location.href = '/'

      
    // }, 1000);

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
            {isAuth === true &&         <><Nav.Link href="/">Add Todo </Nav.Link><Nav.Link href="/edit">View list</Nav.Link></> }
   
            {isAuth === false &&   <><Nav.Link href="/register">Register</Nav.Link><Nav.Link href="/login">login</Nav.Link></>  }
         


        
          </Nav>
          {data &&  <Nav.Link  style={{marginRight:"40px"}}>{data.email}</Nav.Link>  }

          {isAuth === true && <Nav.Link  onClick={()=>{logoutHandler()}}>Logout</Nav.Link>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>






    <Route exact path='/' element={<ProtectedRoute/>}>
            <Route exact path='/' element={<Add/>}/>
          </Route>      
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route exact path='/edit' element={<ProtectedRoute/>}>
            <Route exact path='/edit' element={<Edit/>}/>
          </Route>    
    
    </Routes>
  </BrowserRouter>
  </ApolloProvider>
  );
}

export default App;
