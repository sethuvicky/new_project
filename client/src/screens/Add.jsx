import React,{useEffect, useState} from 'react'
import './add.css'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Edit from './View';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'react-toastify/dist/ReactToastify.css';import axios from 'axios';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { CREATE_USER_MUTATION } from "../Graphql/Mutations";
import { useMutation } from "@apollo/client";

const Add = () => {

    let [input,setInput] = useState()
    let [datas,setdatas] = useState([null])
    const [createTodo, { error }] = useMutation(CREATE_USER_MUTATION);

//     let Submithandler = ((e)=>{
// e.preventDefault()
// if(e.target[0].value !==''){
//     input.push(e.target[0].value)
//     let dataS = localStorage.getItem("todo")

//     localStorage.setItem("todo",[dataS,input])
//     toast.success("Added successfully")
//     const interval = setInterval(() => {
//       window.location.href ='/edit'
//     }, 2000);
//     interval()
// }else{
//     toast.error("Please Enter something")
// }


//     })

let Submithandler =(async(e)=>{
  e.preventDefault()

  const client = new ApolloClient({
    uri: 'http://localhost:3004/graphql',
    cache: new InMemoryCache(),
  });
    if(e.target[0].value !==''){
console.log(input)

createTodo({
        variables: {
          title:input
        },
      });

    if (error) {
      console.log(error)
     }else{
      toast.success("data added")
      console.log(error)
     }
    }else{
      toast.error("Please Enter something")
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
    <>
            <ToastContainer position='center' />
        <h1 style={{textAlign:"center" ,marginTop:"100px"}}>Welcome To do list</h1>
        <div className='parent'> 
    <div>

    </div>
    
        <div>

        <form  onSubmit={(e)=>Submithandler(e)}>
       
  <InputGroup className="mb-3">
        <Form.Control
                onChange={(e)=>{setInput(e.target.value)}} 

          placeholder="Enter "
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button type='submit' variant="success" id="button-addon2">
        +
        </Button>
      </InputGroup>
</form>
        </div>

    

        
    </div>
    {!datas.length ? <p>No Entries</p>:
    <div style={{marginLeft:"50%",marginTop:"10px"}} >
    <Link to="/edit" >View List</Link>

    </div>

  
  }
    </>
    
 
  )
}

export default Add