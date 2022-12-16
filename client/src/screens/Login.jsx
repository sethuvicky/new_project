import React,{useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
 import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
 let navigate = useNavigate()

 
  const submitHandler = (async(e)=>{
    e.preventDefault()
    console.log(email,password)


    let data = await axios.post("http://localhost:3004/auth" ,{email,password})
    if(data.data.error){
      toast.error(data.data.error)
    }else{
      toast.success("successfuly logged in")

      localStorage.setItem("accessToken", data.data.token);
      console.log(data.data.token)
      localStorage.setItem("userid",data.data.user.id)
      localStorage.setItem("username",data.data.user.email)


      window.location.href = '/'


    
      
    }



  })

  useEffect(()=>{
    let token =  localStorage.getItem("accessToken");


    if(token){
      navigate("/")
    }

  },[])
  return (
    <><ToastContainer position='bottom' /><div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>

      <div style={{ marginTop: "10%" }}>
        <h1>Login</h1>


        <Form onSubmit={(e) => submitHandler(e)} style={{ marginTop: "10%" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div></>

  )
}

 

export default Login