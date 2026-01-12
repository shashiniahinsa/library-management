import React, { useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { SignUp } from './SignUp';
import { SignInReq } from '../../service/AuthProcess/Auths';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router';

interface SignIn {
  email: string;
  password: string;

}

export const SignIn = ({ show, handleClose }: any) => {

  const [ signIn, setSignIn] = useState<SignIn>({
    email: "",
    password: ""
})

const { login} = useAuth();
 const navigate = useNavigate()

const handleOnChange = (e :React.ChangeEvent<HTMLInputElement>)=>{
   setSignIn({...signIn,[e.target.name]: e.target.value});
 }

 const handleReset = () =>{
  setSignIn({
    email:"",
    password:"",
  })
 }

const handleOnSubmit = async (e:React.ChangeEvent<HTMLFormElement>) =>{
    //API req
    e.preventDefault();
    console.log(JSON.stringify(signIn))
    const token=await SignInReq(signIn)
    login(token)
    handleReset();
    navigate("/book")

} 

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
             type="text"
             name="email"
             value={signIn.email}
             onChange={handleOnChange}
           />            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
             type="password"
             name="password"
             value={signIn.password}
             onChange={handleOnChange}
           />            </Form.Group>
 

     
        <Button variant="success" type="submit">SignIn</Button>
        <Button variant="danger" onClick={handleReset} className="mx-2">Reset</Button> 
        
        </Form>
        </Modal.Body>
      </Modal>
    </>

  );
};
