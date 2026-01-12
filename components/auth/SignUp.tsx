import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { SignUpReq } from "../../service/AuthProcess/Auths"
import { useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";
interface SignUp {
  // userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: Role;
}

enum Role {
  ADMIN = "ADMIN",
  OFFICER = "OFFICER",
  LIBRARIAN = "LIBRARIAN",
}

export const SignUp = ({ show, handleClose }: any) => {
  const [signUp, setSignUp] = useState<SignUp>({
    // userId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: undefined,
  });

  const handleReset = () => {
    setSignUp({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: undefined,
    });
  };

  const { login} = useAuth();
 const navigate = useNavigate()

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async () => {
    //API req
    console.log(JSON.stringify(signUp));
    const token = await SignUpReq(signUp)
     login(token)
     handleReset();
     navigate("/book")  

  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={signUp.email}
                onChange={handleOnChange}
              />{" "}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={signUp.firstName}
                onChange={handleOnChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={signUp.lastName}
                onChange={handleOnChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={signUp.password}
                onChange={handleOnChange}
              />{" "}
            </Form.Group>

            <Form.Select
              name="role"
              value={signUp.role || ""}
              onChange={handleOnChange}
            >
              <option>Role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="LIBRARIAN">LIBRARIAN</option>
              <option value="OFFICER">OFFICER</option>
            </Form.Select>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={handleOnSubmit}>
            SignIn
          </Button>
          <Button variant="danger" className="mx-2">
            Reset
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
