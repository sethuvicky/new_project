import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
 import { useNavigate } from 'react-router-dom';
const Register = ({id}) => {
   let navigate = useNavigate()
  const [data,setdata] = useState()

  useEffect(()=>{
axios.get(`http://localhost:3004/user/${id}`).then((data)=>{
    setdata(data.data)
})

 console.log(data)

  },[])
 
  
  
  return (
    <><p>User   -{data && data.email && data.email}</p></>

  )
} 

 

export default Register