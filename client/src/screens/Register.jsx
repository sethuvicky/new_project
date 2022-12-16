import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
 import { useNavigate } from 'react-router-dom';
const Register = () => {
   let navigate = useNavigate()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [password2,setPassword2] = useState()

  useEffect(()=>{
    let token =  localStorage.getItem("accessToken");


    if(token){
      navigate("/")
    }

  },[])
  let Submithandler =(async(e)=>{
    e.preventDefault()
 

    const client = new ApolloClient({
      uri: 'http://localhost:3004/graphql',
      cache: new InMemoryCache(),
    });

    if(password ==password2){
      let {data} = await client.mutate({
        mutation: gql`
        mutation{
          CreateUser(email:"${email}",password:"${password}") {
            id
          }
        }
        `,
      })
      toast.success("user created successfuly")


      setInterval(() => {
        navigate("/login")

        
      }, 2000);
      console.log(data)

    }else{
      toast.error("passwords must be same")
    }
  
  
  //   if(e.target[0].value !==''){
   
  //     console.log(input)
  
  //     let req = await axios.post('http://localhost:8001/api', {title:input})
  //     if(req.status==200){
  //       toast.success("Successfully saved")
  //     }else{
  //       toast.error("something went wrong")
  //     }
  
    
     
  // }else{
  //     toast.error("Please Enter something")
  // }
  
  
  })
  return (
    <><ToastContainer position='bottom' /><div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>

      <div style={{ marginTop: "10%" }}>
        <h1>Register</h1>


        <Form onSubmit={(e) => Submithandler(e)} style={{ marginTop: "10%" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e) => setPassword2(e.target.value)} type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div></>

  )
}

 

export default Register