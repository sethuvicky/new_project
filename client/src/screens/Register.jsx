import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Register = () => {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
<div style={{marginTop:"10%"}}>
    <h1>Register</h1>


    <Form style={{marginTop:"10%"}}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />

    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
  
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </div>
  </div>

  )
}

 

export default Register